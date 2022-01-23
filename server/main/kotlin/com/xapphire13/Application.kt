package com.xapphire13

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.FirestoreDb
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UserStore
import com.xapphire13.routes.configureRouting
import com.xapphire13.schema.configureSchema
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    FirestoreDb.initialize()
    val userStore = UserStore(FirestoreDb.db)
    val invitationStore = InvitationStore(FirestoreDb.db)
    val challengeStore = ChallengeStore(FirestoreDb.db)

    embeddedServer(Netty, port = System.getenv("PORT").toInt(), host = "0.0.0.0") {
        configureSchema(userStore, invitationStore, challengeStore)
        configureRouting(userStore, challengeStore)
    }.start(wait = true)
}
