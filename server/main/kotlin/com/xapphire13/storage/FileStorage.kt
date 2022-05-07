package com.xapphire13.storage

import com.google.cloud.storage.Blob
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.HttpMethod
import com.google.cloud.storage.Storage
import com.xapphire13.models.CreateUploadUrlResponse
import com.xapphire13.utils.generateId
import java.util.concurrent.TimeUnit

private const val UPLOADS_DIR = "uploads"

class FileStorage(private val storage: Storage) {
    fun createUploadUrl(): CreateUploadUrlResponse {
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

        return CreateUploadUrlResponse(id = fileName, uploadUrl = signedUrl.toString())
    }

    fun deleteFile(id: String): Boolean {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.delete(blobId)
    }

    fun getFile(id: String): Blob? {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.get(blobId)
    }
}
