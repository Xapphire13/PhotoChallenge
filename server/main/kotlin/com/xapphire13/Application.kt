package com.xapphire13

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.FeatureStore
import com.xapphire13.database.FirestoreDb
import com.xapphire13.database.GroupStore
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UploadStore
import com.xapphire13.database.UserStore
import com.xapphire13.routes.configureRouting
import com.xapphire13.schema.configureSchema
import com.xapphire13.storage.FileStorage
import com.xapphire13.storage.FirebaseStorage
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    FirestoreDb.initialize()
    FirebaseStorage.initialize()

    val featureStore = FeatureStore(FirestoreDb.db)
    val groupStore = GroupStore(FirestoreDb.db)
    val invitationStore = InvitationStore(FirestoreDb.db)
    val challengeStore = ChallengeStore(FirestoreDb.db)
    val userStore = UserStore(FirestoreDb.db, groupStore)
    val fileStorage = FileStorage(FirebaseStorage.storage)
    val uploadStore = UploadStore(FirestoreDb.db, fileStorage, challengeStore)

    embeddedServer(Netty, port = System.getenv("PORT").toInt(), host = "0.0.0.0") {
        configureSchema(
            userStore,
            invitationStore,
            challengeStore,
            fileStorage,
            uploadStore,
            groupStore,
            featureStore
        )
        configureRouting(userStore, challengeStore, fileStorage)
    }
        .start(wait = true)
}
