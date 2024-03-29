package com.xapphire13.database

import com.google.cloud.Timestamp
import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.Challenge
import io.github.reactivecircus.cache4k.Cache
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import java.time.Instant
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.util.Date

class FirebaseChallengeStore(db: Firestore) : ChallengeStore {
    private val groupsCollection = db.collection("groups")
    private val usersCollection = db.collection("users")
    private val futureChallengeCountCache = Cache.Builder().build<String, Int>()
    private val futureChallengeCountCacheSemaphore = Semaphore(1)

    override suspend fun listChallenges(groupId: String): List<Challenge> {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val documents =
            challengesCollection
                .listDocuments()
                .map { it.get().asDeferred(Dispatchers.IO) }
                .awaitAll()

        return documents.map { it.toChallenge(groupId) }
    }

    override suspend fun getChallenge(groupId: String, id: String): Challenge? {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val document = challengesCollection.document(id).get().await(Dispatchers.IO)

        return if (document.exists()) document.toChallenge(groupId) else null
    }

    override suspend fun getCurrentChallenge(groupId: String): Challenge? {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val query =
            challengesCollection
                .whereGreaterThan("endsAt", Timestamp.now())
                .get()
                .await(Dispatchers.IO)
        var currentChallenge = query.firstOrNull()?.toChallenge(groupId)

        if (currentChallenge == null) {
            val nextChallenge =
                challengesCollection
                    .whereEqualTo("endsAt", null)
                    .get()
                    .await(Dispatchers.IO)
                    .documents
                    .randomOrNull()

            if (nextChallenge != null) {
                val nextChallengeDueDate =
                    Instant.now()
                        .atZone(ZoneOffset.UTC)
                        .let {
                            if (it.hour >= 15) {
                                it.plusDays(1)
                            } else {
                                it
                            }
                        }
                        .let {
                            ZonedDateTime.of(
                                it.year,
                                it.monthValue,
                                it.dayOfMonth,
                                15,
                                0,
                                0,
                                0,
                                ZoneOffset.UTC
                            )
                                .toInstant()
                        }

                nextChallenge
                    .reference
                    .update("endsAt", Timestamp.of(Date.from(nextChallengeDueDate)))
                    .await(Dispatchers.IO)

                currentChallenge =
                    nextChallenge.toChallenge(groupId).copy(endsAt = nextChallengeDueDate.toString())

                this.futureChallengeCountCacheSemaphore.withPermit {
                    this.futureChallengeCountCache.get(groupId)?.let { prev ->
                        this.futureChallengeCountCache.put(groupId, prev.minus(1))
                    }
                }
            }
        }

        return currentChallenge
    }

    override suspend fun getPastChallenges(groupId: String): List<Challenge> {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val query =
            challengesCollection
                .whereLessThanOrEqualTo("endsAt", Timestamp.now())
                .get()
                .await(Dispatchers.IO)

        return query.documents.map { it.toChallenge(groupId) }
    }

    override suspend fun getFutureChallengeCount(groupId: String): Int {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val count = this.futureChallengeCountCacheSemaphore.withPermit {
            this.futureChallengeCountCache.get(groupId) {
                challengesCollection
                    .whereEqualTo("endsAt", null)
                    .get()
                    .await(Dispatchers.IO)
                    .documents
                    .count()
            }
        }

        return count
    }

    override suspend fun addChallenge(groupId: String, challengeName: String, userId: String) {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        challengesCollection
            .add(
                mapOf(
                    "name" to challengeName,
                    "createdBy" to usersCollection.document(userId),
                    "endsAt" to null
                )
            )
            .await(Dispatchers.IO)

        this.futureChallengeCountCacheSemaphore.withPermit {
            this.futureChallengeCountCache.get(groupId)?.let { prev ->
                this.futureChallengeCountCache.put(groupId, prev.plus(1))
            }
        }
    }

    private fun DocumentSnapshot.toChallenge(groupId: String) =
        Challenge(
            id,
            groupId,
            name = getString("name")!!,
            createdBy = (get("createdBy") as DocumentReference).id,
            endsAt =
            getTimestamp("endsAt")?.seconds?.let {
                Instant.ofEpochSecond(it).toString()
            },
        )
}
