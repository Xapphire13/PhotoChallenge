package com.xapphire13.routes

import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UserStore
import io.ktor.application.Application
import io.ktor.routing.routing

fun Application.configureRouting(userStore: UserStore, challengeStore: ChallengeStore) {
    routing {
        loginRoutes(userStore)
        linkPreviewRoutes(challengeStore)
        appRoutes()
    }
}
