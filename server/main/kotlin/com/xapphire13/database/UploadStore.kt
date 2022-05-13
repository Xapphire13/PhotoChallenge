package com.xapphire13.database

import com.google.cloud.firestore.DocumentSnapshot
import com.google.cloud.firestore.Firestore
import com.google.cloud.storage.HttpMethod
import com.google.cloud.storage.Storage
import com.xapphire13.extensions.asDeferred
import com.xapphire13.extensions.await
import com.xapphire13.models.Upload
import com.xapphire13.storage.FileStorage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll
import java.util.concurrent.TimeUnit

class UploadStore(
    db: Firestore,
    private val fileStorage: FileStorage,
    private val challengeStore: ChallengeStore,
    private val userStore: UserStore
) {
    private val challengeCollection = db.collection("challenges")

    suspend fun addUpload(uploadId: String, userId: String, caption: String?) {
        if (fileStorage.getFile(uploadId) == null) {
            throw Exception("File with ID $uploadId doesn't exist")
        }

        val currentChallenge = challengeStore.getCurrentChallenge()

        if (currentChallenge === null) {
            return
        }

        val challengeUploads =
            challengeCollection.document(currentChallenge.id).collection("uploads")

        challengeUploads
            .document(uploadId)
            .set(
                mapOf(
                    "uploadedBy" to userId,
                    "caption" to caption,
                )
            )
            .await(Dispatchers.IO)
    }

    suspend fun getUploads(challengeId: String, fetchUser: Boolean = false, fetchUrl: Boolean = false): List<Upload> {
        val challengeUploads =
            challengeCollection
                .document(challengeId)
                .collection("uploads")
                .listDocuments()
                .map { it.get().asDeferred() }
                .awaitAll()

        return challengeUploads.map {
            it.toUpload().let { upload ->
                val userId = it.getString("uploadedBy")
                if (fetchUser && userId !== null) {
                    return@let upload.copy(uploadedBy = userStore.getUser(userId))
                }

                upload
            }.let { upload ->
                if (fetchUrl) {
                    val blob = fileStorage.getFile(upload.id)
                    val downloadUrl = blob?.signUrl(
                        30,
                        TimeUnit.MINUTES,
                        Storage.SignUrlOption.httpMethod(HttpMethod.GET),
                        Storage.SignUrlOption.withV4Signature()
                    )?.toString()

                    return@let upload.copy(url = downloadUrl)
                }

                upload
            }
        }
    }

    private fun DocumentSnapshot.toUpload() = Upload(id = id)
}
