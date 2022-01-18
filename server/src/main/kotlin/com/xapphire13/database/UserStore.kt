package com.xapphire13.database

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.models.User
import kotlinx.coroutines.Dispatchers

class UserStore(val db: Firestore) {
    private val usersCollection = db.collection("users")

    suspend fun listUsers(): List<User> {
        val documents = this.usersCollection.listDocuments()
        val users = documents.map {
            val result = it.get().asDeferred(Dispatchers.IO).await()

            result.toUser()
        }

        return users
    }

    suspend fun getUser(id: String): User? {
        val document = this.usersCollection.document(id)
        val result = document.get().asDeferred(Dispatchers.IO).await()

        return if (result.exists()) result.toUser() else null
    }

    suspend fun getUserByUsername(username: String): User? {
        val documents = this.usersCollection.whereEqualTo("usernameLower", username.lowercase())
        val result = documents.get().asDeferred(Dispatchers.IO).await().firstOrNull()

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