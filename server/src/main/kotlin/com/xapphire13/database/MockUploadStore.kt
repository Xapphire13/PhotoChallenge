package com.xapphire13.database

import com.xapphire13.models.Upload

class MockUploadStore : UploadStore {
    override suspend fun addUpload(groupId: String, uploadId: String, userId: String, caption: String?) {
        // NO-OP
    }

    override suspend fun getUploads(groupId: String, challengeId: String): List<Upload> {
        return emptyList()
    }
}
