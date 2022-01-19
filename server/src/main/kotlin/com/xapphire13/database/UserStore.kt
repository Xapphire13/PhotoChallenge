package com.xapphire13.database

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.await
import com.xapphire13.models.User
import kotlinx.coroutines.Dispatchers

class UserStore(db: Firestore) {
    private val usersCollection = db.collection("users")

    suspend fun listUsers(): List<User> {
        val documents = this.usersCollection.listDocuments()
        val users = documents.map {
            val result = it.get().await(Dispatchers.IO)

            result.toUser()
        }

        return users
    }

    suspend fun getUser(id: String): User? {
        val document = this.usersCollection.document(id)
        val result = document.get().await(Dispatchers.IO)

        return if (result.exists()) result.toUser() else null
    }

    suspend fun getUserByUsername(username: String): User? {
        val documents = this.usersCollection.whereEqualTo("usernameLower", username.lowercase())
        val result = documents.get().await(Dispatchers.IO).firstOrNull()

        return result?.toUser()
    }

    private fun DocumentSnapshot.toUser(): User = User(
        id = id,
        username = getString("username")!!,
        email = getString("email")!!,
        isAdmin = getBoolean("isAdmin")!!,
        passwordHash = getString("passwordHash")!!,
        passwordSalt = getString("passwordSalt")!!
    )
}