package com.xapphire13.database

import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.await
import com.xapphire13.storage.FileStorage
import kotlinx.coroutines.Dispatchers

class UploadStore(
    db: Firestore,
    private val fileStorage: FileStorage,
    private val challengeStore: ChallengeStore
) {
    private val uploadsCollection = db.collection("uploads")
    private val usersCollection = db.collection("users")

    suspend fun addUpload(uploadId: String, userId: String, caption: String?) {
        if (fileStorage.getFile(uploadId) == null) {
            throw Exception("File with ID $uploadId doesn't exist")
        }

        val currentChallenge = challengeStore.getCurrentChallenge()

        uploadsCollection
            .document(uploadId)
            .set(
                mapOf(
                    "uploadedBy" to userId,
                    "caption" to caption,
                    "forChallenge" to currentChallenge?.id
                )
            )
            .await(Dispatchers.IO)
    }
}
