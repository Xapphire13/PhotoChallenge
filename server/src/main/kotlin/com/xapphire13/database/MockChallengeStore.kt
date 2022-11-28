package com.xapphire13.database

import com.xapphire13.models.Challenge
import java.time.Instant
import java.time.temporal.ChronoUnit

val challenges = mutableListOf(
    Challenge(
        id = "1",
        groupId = "1",
        name = "Test Challenge",
        createdBy = "1",
        endsAt = Instant.now().plus(5, ChronoUnit.HOURS).toString()
    )
)

class MockChallengeStore : ChallengeStore {
    override suspend fun listChallenges(groupId: String): List<Challenge> {
        return challenges
    }

    override suspend fun getChallenge(groupId: String, id: String): Challenge? {
        return this.listChallenges(groupId).find { it.id == id }
    }

    override suspend fun getCurrentChallenge(groupId: String): Challenge? {
        return this.listChallenges(groupId).find { it.endsAt != null && Instant.parse(it.endsAt) > Instant.now() }
    }

    override suspend fun getPastChallenges(groupId: String): List<Challenge> {
        return this.listChallenges(groupId).filter { it.endsAt != null && Instant.parse(it.endsAt) <= Instant.now() }
    }

    override suspend fun getFutureChallengeCount(groupId: String): Int {
        return this.listChallenges(groupId).filter { it.endsAt === null }.count()
    }

    override suspend fun addChallenge(groupId: String, challengeName: String, userId: String) {
        challenges.add(
            Challenge(
                id = (challenges.size + 1).toString(),
                groupId = groupId,
                name = challengeName,
                createdBy = userId
            )
        )
    }
}
