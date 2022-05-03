package com.xapphire13.database

import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.await
import com.xapphire13.models.InvitationResponse
import com.xapphire13.utils.generateId
import kotlinx.coroutines.Dispatchers

private const val alphabet = "abcdefghijklmnopqrstuvwxyz"

class InvitationStore(db: Firestore) {
    private val invitationsCollection = db.collection("invitations")
    private val usersCollection = db.collection("users")

    suspend fun getInvitationsForUser(userId: String): InvitationResponse? {
        val result =
            invitationsCollection
                .whereEqualTo("createdBy", usersCollection.document(userId))
                .get()
                .await(Dispatchers.IO)

        val document = result.firstOrNull()

        return document?.let { InvitationResponse(id = it.id) }
    }

    suspend fun createInvitation(userId: String): InvitationResponse {
        val id = generateId()

        invitationsCollection
            .document(id)
            .set(mapOf("createdBy" to usersCollection.document(userId)))
            .await(Dispatchers.IO)

        return InvitationResponse(id = id)
    }
}
