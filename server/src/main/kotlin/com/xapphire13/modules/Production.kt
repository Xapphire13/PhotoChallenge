package com.xapphire13.modules

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.cloud.storage.Storage
import com.google.cloud.storage.StorageOptions
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import com.xapphire13.database.*
import com.xapphire13.storage.FileStorage
import com.xapphire13.storage.FirebaseFileStorage
import org.koin.dsl.module
import java.util.Base64

val productionModule = module {
    single<Firestore> {
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

        FirestoreClient.getFirestore()
    }

    single<Storage> {
        val credentials =
            GoogleCredentials.fromStream(
                Base64.getDecoder().decode(System.getenv("FIREBASE_CREDENTIALS")).inputStream()
            )

        StorageOptions.newBuilder()
            .setCredentials(credentials)
            .setProjectId(System.getenv("FIREBASE_PROJECT_ID"))
            .build()
            .service
    }

    single<FeatureStore> { FirebaseFeatureStore(get()) }
    single<GroupStore> { FirebaseGroupStore(get()) }
    single<InvitationStore> { FirebaseInvitationStore(get()) }
    single<ChallengeStore> { FirebaseChallengeStore(get()) }
    single<UserStore> { FirebaseUserStore(get(), get()) }
    single<FileStorage> { FirebaseFileStorage(get()) }
    single<UploadStore> { FirebaseUploadStore(get(), get(), get()) }
}
