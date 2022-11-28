package com.xapphire13.modules

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.cloud.storage.Storage
import com.google.cloud.storage.StorageOptions
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.FeatureStore
import com.xapphire13.database.GroupStore
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UploadStore
import com.xapphire13.database.UserStore
import com.xapphire13.storage.FileStorage
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

    single<FeatureStore> { FeatureStore(get()) }
    single<GroupStore> { GroupStore(get()) }
    single<InvitationStore> { InvitationStore(get()) }
    single<ChallengeStore> { ChallengeStore(get()) }
    single<UserStore> { UserStore(get(), get()) }
    single<FileStorage> { FileStorage(get()) }
    single<UploadStore> { UploadStore(get(), get(), get()) }
}
