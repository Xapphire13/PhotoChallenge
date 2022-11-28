package com.xapphire13.database

import com.xapphire13.models.User

interface UserStore {
    suspend fun listUsers(): List<User>
    suspend fun getUser(id: String): User?
    suspend fun getUserByUsername(username: String): User?
    suspend fun createUser(username: String, email: String, password: String, invitationCode: String): Unit
}
