package com.xapphire13.routes

import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.io.path.isRegularFile

fun Routing.appRoutes() {
    get("/{...}") {
        val path = Path(System.getenv("APP_ROOT") + call.request.path())

        if (path.exists() && path.isRegularFile()) {
            call.respondFile(path.toFile())
        } else {
            call.respondFile(File(System.getenv("APP_ROOT") + "/index.html"))
        }
    }
}
