package com.xapphire13.database

import com.xapphire13.models.Challenge

interface ChallengeStore {
    suspend fun listChallenges(groupId: String): List<Challenge>
    suspend fun getChallenge(groupId: String, id: String): Challenge?
    suspend fun getCurrentChallenge(groupId: String): Challenge?
    suspend fun getPastChallenges(groupId: String): List<Challenge>
    suspend fun getFutureChallengeCount(groupId: String): Int
    suspend fun addChallenge(groupId: String, challengeName: String, userId: String)
}
