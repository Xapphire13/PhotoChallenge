package com.xapphire13.database

import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.auth.PasswordUtils
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.User
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll

class FirebaseUserStore(db: Firestore, private val groupStore: GroupStore) : UserStore {
    private val usersCollection = db.collection("users")
    private val invitationsCollection = db.collection("invitations")

    override suspend fun listUsers(): List<User> {
        val documents = this.usersCollection.listDocuments().map { it.get().asDeferred() }.awaitAll()

        return documents.map { it.toUser() }
    }

    override suspend fun getUser(id: String): User? {
        val document = this.usersCollection.document(id)
        val result = document.get().await(Dispatchers.IO)

        // TODO, protect access to privileged fields
        return if (result.exists()) result.toUser() else null
    }

    override suspend fun getUserByUsername(username: String): User? {
        val documents = this.usersCollection.whereEqualTo("usernameLower", username.lowercase())
        val result = documents.get().await(Dispatchers.IO).firstOrNull()

        return result?.toUser()
    }

    override suspend fun createUser(username: String, email: String, password: String, invitationCode: String) {
        val invitation = invitationsCollection.document(invitationCode).get().await(Dispatchers.IO)

        if (!invitation.exists()) {
            throw Error("Invalid invitation")
        }

        val usernameTaken =
            usersCollection.whereEqualTo("usernameLower", username.lowercase()).get().await(Dispatchers.IO).size() > 0

        if (usernameTaken) {
            throw Error("Username already taken")
        }

        val emailTaken = usersCollection.whereEqualTo("email", email.lowercase()).get().await(Dispatchers.IO).size() > 0

        if (emailTaken) {
            throw Error("User with email already exists")
        }

        val passwordSalt = PasswordUtils.generateSalt()
        val hashedPassword = PasswordUtils.generateHash(password + passwordSalt)

        val newUser = usersCollection.add(
            mapOf(
                "username" to username,
                "usernameLower" to username.lowercase(),
                "email" to email.lowercase(),
                "isAdmin" to false,
                "originalInvitation" to invitation.reference,
                "passwordHash" to hashedPassword,
                "passwordSalt" to passwordSalt
            )
        ).await(Dispatchers.IO)

        this.groupStore.addUserToGroup((invitation.get("group") as DocumentReference).id, newUser.id)
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
