package com.xapphire13.storage

import com.google.cloud.storage.Blob
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.Storage
import java.io.InputStream

private const val UPLOADS_DIR = "uploads"

class FileStorage(private val storage: Storage) {
    fun deleteFile(id: String): Boolean {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.delete(blobId)
    }

    fun getFile(id: String): Blob? {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.get(blobId)
    }

    fun uploadFile(id: String, contentType: String, content: ByteArray) {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")
        val blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build()

        storage.create(blobInfo, content)
    }

    fun uploadFile(id: String, contentType: String, content: InputStream) {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")
        val blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build()

        storage.createFrom(blobInfo, content)
    }
}
