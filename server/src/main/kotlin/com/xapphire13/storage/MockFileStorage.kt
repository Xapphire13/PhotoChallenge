package com.xapphire13.storage

import com.google.cloud.storage.Blob
import java.io.InputStream

class MockFileStorage : FileStorage {
    override fun deleteFile(id: String): Boolean {
        return false
    }

    override fun getFile(id: String): Blob? {
        return null
    }

    override fun uploadFile(id: String, contentType: String, content: ByteArray) {
        // NO-OP
    }

    override fun uploadFile(id: String, contentType: String, content: InputStream) {
        // NO-OP
    }
}
