package com.xapphire13.database

import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.Upload
import com.xapphire13.storage.FileStorage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll

class UploadStore(
    db: Firestore,
    private val fileStorage: FileStorage,
    private val challengeStore: ChallengeStore,
) {
    private val groupsCollection = db.collection("groups")
    private val usersCollection = db.collection("users")

    suspend fun addUpload(groupId: String, uploadId: String, userId: String, caption: String?) {
        if (fileStorage.getFile(uploadId) == null) {
            throw Exception("File with ID $uploadId doesn't exist")
        }
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val currentChallenge = challengeStore.getCurrentChallenge(groupId)

        if (currentChallenge === null) {
            return
        }

        val challengeUploads =
            challengesCollection.document(currentChallenge.id).collection("uploads")

        challengeUploads
            .document(uploadId)
            .set(
                mapOf(
                    "uploadedBy" to usersCollection.document(userId),
                    "caption" to caption,
                )
            )
            .await(Dispatchers.IO)
    }

    suspend fun getUploads(
        groupId: String,
        challengeId: String,
    ): List<Upload> {
        val challengesCollection = groupsCollection.document(groupId).collection("challenges")
        val challengeUploads =
            challengesCollection
                .document(challengeId)
                .collection("uploads")
                .listDocuments()
                .map { it.get().asDeferred() }
                .awaitAll()

        return challengeUploads.map {
            it.toUpload()
        }
    }

    private fun DocumentSnapshot.toUpload() = Upload(id = id, caption = this.getString("caption"), uploadedById = (this.get("uploadedBy") as DocumentReference).id)
}
