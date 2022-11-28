package com.xapphire13.database

import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.Frequency
import com.xapphire13.models.Group
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll

class FirebaseGroupStore(db: Firestore) : GroupStore {
    private val groupsCollection = db.collection("groups")
    private val usersCollection = db.collection("users")

    override suspend fun listGroups(): List<Group> {
        return this.groupsCollection.listDocuments().map { it.get().asDeferred() }.awaitAll().map { it.toGroup() }
    }

    override suspend fun getGroup(id: String): Group? {
        val document = this.groupsCollection.document(id).get().await(Dispatchers.IO)

        return if (document.exists()) document.toGroup() else null
    }

    override suspend fun addUserToGroup(groupId: String, userId: String) {
        val group = groupsCollection.document(groupId)
        val user = usersCollection.document(userId)

        // TODO make concurrent safe
        val existingUsers = (group.get().await().get("users") as? List<*>)?.filterIsInstance<DocumentReference>() ?: emptyList()

        group.update("users", existingUsers.filter { it.id !== user.id }.plus(user))
    }

    private fun DocumentSnapshot.toGroup(): Group {
        return Group(id = this.id, userIds = (this.get("users") as? List<*>)?.filterIsInstance<DocumentReference>()?.map { it.id } ?: emptyList(), frequency = this.getString("frequency")?.let { Frequency.valueOf(it) } ?: Frequency.DAILY, name = this.getString("name") ?: "")
    }
}
