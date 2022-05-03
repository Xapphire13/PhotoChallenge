package com.xapphire13.storage

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.storage.Storage
import com.google.cloud.storage.StorageOptions

class FirebaseStorage {
    companion object {
        lateinit var storage: Storage

        fun initialize() {
            val credentials =
                GoogleCredentials.fromStream(System.getenv("FIREBASE_CREDENTIALS").byteInputStream())

            storage =
                StorageOptions.newBuilder()
                    .setCredentials(credentials)
                    .setProjectId(System.getenv("FIREBASE_PROJECT_ID"))
                    .build()
                    .getService()
        }
    }
}
