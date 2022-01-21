package com.xapphire13.database

import com.google.cloud.Timestamp
import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.Challenge
import com.xapphire13.models.UnitResponse
import io.ktor.util.date.GMTDate
import io.ktor.util.date.toGMTDate
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll
import java.text.DateFormat
import java.time.Instant
import java.time.format.DateTimeFormatter

class ChallengeStore(db: Firestore) {
    private val challengesCollection = db.collection("challenges")
    private val usersCollection = db.collection("users")

    suspend fun listChallenges(): List<Challenge> {
        val documents = challengesCollection.listDocuments().map {
            it.get().asDeferred(Dispatchers.IO)
        }.awaitAll()

        return documents.map { it.toChallenge() }
    }

    suspend fun getChallenge(id: String): Challenge {
        val document = challengesCollection.document(id).get().await(Dispatchers.IO)

        return document.toChallenge()
    }

    suspend fun getCurrentChallenge(): Challenge? {
        val query = challengesCollection.whereGreaterThan("endsAt", Timestamp.now()).get().await(Dispatchers.IO)

        return query.firstOrNull()?.toChallenge()
    }

    suspend fun getPastChallenges(): List<Challenge> {
        val query = challengesCollection.whereLessThanOrEqualTo("endsAt", Timestamp.now()).get().await(Dispatchers.IO)

        return query.documents.map { it.toChallenge() }
    }

    suspend fun getFutureChallenges(): List<Challenge> {
        val query = challengesCollection.whereEqualTo("endsAt", null).get().await(Dispatchers.IO)

        return query.documents.map { it.toChallenge() }
    }

    suspend fun addChallenge(challengeName: String, userId: String) {
        challengesCollection.add(mapOf(
            "name" to challengeName,
            "createdBy" to usersCollection.document(userId),
            "endsAt" to null
        )).await(Dispatchers.IO)
    }

    private fun DocumentSnapshot.toChallenge() = Challenge(
        id,
        name = getString("name")!!,
        createdBy = (get("createdBy") as DocumentReference).id,
        endsAt = getTimestamp("endsAt")?.seconds?.let { Instant.ofEpochSecond(it).toString() }
    )
}