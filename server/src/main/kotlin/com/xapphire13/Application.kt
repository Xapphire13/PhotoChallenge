package com.xapphire13

import com.xapphire13.database.FirestoreDb
import com.xapphire13.database.UserStore
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.xapphire13.plugins.*
import com.xapphire13.schema.configureSchema

fun main()  {
    FirestoreDb.initialize()
    val userStore = UserStore(FirestoreDb.db)

    embeddedServer(Netty, port = System.getenv("PORT").toInt(), host = "0.0.0.0") {
        configureRouting(userStore)
        configureSchema(userStore)
    }.start(wait = true)
}
