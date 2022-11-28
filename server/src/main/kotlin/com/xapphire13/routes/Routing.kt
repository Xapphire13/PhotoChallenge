package com.xapphire13.routes

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UserStore
import com.xapphire13.storage.FileStorage
import io.ktor.server.application.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Application.configureRouting() {
    val userStore by inject<UserStore>()
    val challengeStore by inject<ChallengeStore>()
    val fileStorage by inject<FileStorage>()

    routing {
        loginRoutes(userStore)
        linkPreviewRoutes(challengeStore)
        uploadRoutes(fileStorage)
        appRoutes()
    }
}
