package com.xapphire13.database

import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.await
import com.xapphire13.models.Invitation
import com.xapphire13.utils.generateId
import kotlinx.coroutines.Dispatchers

class FirebaseInvitationStore(db: Firestore) : InvitationStore {
    private val invitationsCollection = db.collection("invitations")
    private val usersCollection = db.collection("users")
    private val groupsCollection = db.collection("groups")

    override suspend fun getInvitationsForUser(userId: String): List<Invitation> {
        val result =
            invitationsCollection
                .whereEqualTo("createdBy", usersCollection.document(userId))
                .get()
                .await(Dispatchers.IO)

        return result.map { it.toInvitation() }
    }

    override suspend fun createInvitation(userId: String, groupId: String): Invitation {
        val id = generateId()

        invitationsCollection
            .document(id)
            .set(
                mapOf(
                    "createdBy" to usersCollection.document(userId),
                    "group" to groupsCollection.document(groupId)
                )
            )
            .await(Dispatchers.IO)

        return Invitation(id = id, createdById = userId, groupId)
    }

    private fun DocumentSnapshot.toInvitation() = Invitation(id, groupId = (this.get("group") as DocumentReference).id, createdById = (this.get("createdBy") as DocumentReference).id)
}
