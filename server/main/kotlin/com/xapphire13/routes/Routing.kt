package com.xapphire13.routes

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UserStore
import com.xapphire13.storage.FileStorage
import io.ktor.application.Application
import io.ktor.routing.routing

fun Application.configureRouting(userStore: UserStore, challengeStore: ChallengeStore, fileStorage: FileStorage) {
    routing {
        loginRoutes(userStore)
        linkPreviewRoutes(challengeStore)
        imageRoutes(fileStorage)
        appRoutes()
    }
}
