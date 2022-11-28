package com.xapphire13.storage

import com.google.cloud.storage.Blob
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.Storage
import java.io.InputStream

private const val UPLOADS_DIR = "uploads"

class FirebaseFileStorage(private val storage: Storage) : FileStorage {
    override fun deleteFile(id: String): Boolean {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.delete(blobId)
    }

    override fun getFile(id: String): Blob? {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")

        return storage.get(blobId)
    }

    override fun uploadFile(id: String, contentType: String, content: ByteArray) {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")
        val blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build()

        storage.create(blobInfo, content)
    }

    override fun uploadFile(id: String, contentType: String, content: InputStream) {
        val blobId = BlobId.of(System.getenv("FIREBASE_STORAGE_BUCKET"), "$UPLOADS_DIR/$id")
        val blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build()

        storage.createFrom(blobInfo, content)
    }
}
