package com.xapphire13.routes

import com.auth0.jwt.exceptions.JWTVerificationException
import com.xapphire13.auth.JWTUtils
import io.ktor.application.call
import io.ktor.http.Parameters
import io.ktor.http.formUrlEncode
import io.ktor.request.path
import io.ktor.response.respondFile
import io.ktor.response.respondRedirect
import io.ktor.routing.Routing
import io.ktor.routing.get
import java.io.File
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.io.path.isRegularFile

fun Routing.appRoutes() {
    get("/{...}") {
        val requestCookies = call.request.cookies
        val responseCookies = call.response.cookies

        requestCookies["token"]?.let { token ->
            try {
                JWTUtils.verifyOldToken(token)

                responseCookies.appendExpired("token")
                responseCookies.appendExpired("loggedIn")

                val params = Parameters.build {
                    append("redir", call.request.path())
                }
                call.respondRedirect("/login?${params.formUrlEncode()}")
            } catch (err: JWTVerificationException) {
                // This means they're using the new token, so we're all good
            }
        }

        val path = Path("./dist" + call.request.path())

        if (path.exists() && path.isRegularFile()) {
            call.respondFile(path.toFile())
        } else {
            call.respondFile(File("./dist/index.html"))
        }
    }
}