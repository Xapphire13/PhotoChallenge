package com.xapphire13.database

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import java.util.*

class FirestoreDb {
    companion object {
        lateinit var db: Firestore

        fun initialize() {
            val credentials =
                GoogleCredentials.fromStream(
                    Base64.getDecoder().decode(System.getenv("FIREBASE_CREDENTIALS")).inputStream()
                )
            val options =
                FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .setProjectId(System.getenv("FIREBASE_PROJECT_ID"))
                    .build()
            FirebaseApp.initializeApp(options)

            db = FirestoreClient.getFirestore()
        }
    }
}
