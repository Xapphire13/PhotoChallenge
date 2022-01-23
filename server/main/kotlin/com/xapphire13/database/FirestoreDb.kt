package com.xapphire13.database

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient

class FirestoreDb {
    companion object {
        lateinit var db: Firestore

        fun initialize() {
            val credentials = GoogleCredentials.fromStream(System.getenv("FIREBASE_CREDENTIALS").byteInputStream())
            val options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .setProjectId(System.getenv("FIREBASE_PROJECT_ID"))
                .build()
            FirebaseApp.initializeApp(options)

            db = FirestoreClient.getFirestore()
        }
    }
}
