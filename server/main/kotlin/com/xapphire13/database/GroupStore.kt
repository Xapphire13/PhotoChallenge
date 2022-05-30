package com.xapphire13.database

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.await
import com.xapphire13.models.Frequency
import com.xapphire13.models.Group
import kotlinx.coroutines.Dispatchers

class GroupStore(db: Firestore) {
    private val groupsCollection = db.collection("groups")

    suspend fun getGroup(id: String): Group? {
        val document = this.groupsCollection.document(id).get().await(Dispatchers.IO)

        return if (document.exists()) document.toGroup() else null
    }

    private fun DocumentSnapshot.toGroup(): Group {
        return Group(id = this.id, userIds = this.get("users") as? List<String> ?: emptyList(), frequency = this.getString("frequency")?.let { Frequency.valueOf(it) } ?: Frequency.DAILY)
    }
}
