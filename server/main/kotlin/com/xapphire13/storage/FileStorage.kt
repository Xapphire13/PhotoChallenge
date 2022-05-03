package com.xapphire13.storage

import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.HttpMethod
import com.google.cloud.storage.Storage
import com.xapphire13.utils.generateId
import java.util.concurrent.TimeUnit

private const val UPLOADS_DIR = "uploads"

class FileStorage(val storage: Storage) {
    fun createUploadUrl(): String {
        val fileName = generateId()
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$fileName")
        val blobInfo = BlobInfo.newBuilder(blobId).build()
        val signedUrl =
            storage.signUrl(
                blobInfo,
                30,
                TimeUnit.MINUTES,
                Storage.SignUrlOption.httpMethod(HttpMethod.PUT),
                Storage.SignUrlOption.withV4Signature(),
            )

        return signedUrl.toString()
    }
}
