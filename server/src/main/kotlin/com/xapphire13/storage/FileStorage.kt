package com.xapphire13.storage

import com.google.cloud.storage.Blob
import java.io.InputStream

interface FileStorage {
    fun deleteFile(id: String): Boolean
    fun getFile(id: String): Blob?
    fun uploadFile(id: String, contentType: String, content: ByteArray)
    fun uploadFile(id: String, contentType: String, content: InputStream)
}
