package com.xapphire13.database

import com.xapphire13.models.Upload

interface UploadStore {
    suspend fun addUpload(groupId: String, uploadId: String, userId: String, caption: String?)
    suspend fun getUploads(groupId: String, challengeId: String): List<Upload>
}
