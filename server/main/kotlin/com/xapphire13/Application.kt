package com.xapphire13

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.FirestoreDb
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UserStore
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.xapphire13.plugins.*
import com.xapphire13.schema.configureSchema
import io.ktor.application.call
import io.ktor.http.Parameters
import io.ktor.http.formUrlEncode
import io.ktor.request.path

fun main()  {
    FirestoreDb.initialize()
    val userStore = UserStore(FirestoreDb.db)
    val invitationStore = InvitationStore(FirestoreDb.db)
    val challengeStore = ChallengeStore(FirestoreDb.db)

    embeddedServer(Netty, port = System.getenv("PORT").toInt(), host = "0.0.0.0") {
        configureSchema(userStore, invitationStore, challengeStore)
        configureRouting(userStore)
    }.start(wait = true)
}
