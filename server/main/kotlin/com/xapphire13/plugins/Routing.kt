package com.xapphire13.plugins

import com.xapphire13.auth.JWTUtils
import com.xapphire13.auth.PasswordUtils
import com.xapphire13.database.UserStore
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.features.ContentTransformationException
import io.ktor.http.content.default
import io.ktor.http.content.files
import io.ktor.http.content.static
import io.ktor.http.content.staticRootFolder
import io.ktor.request.path
import io.ktor.request.receiveParameters
import io.ktor.response.*
import io.ktor.util.date.toGMTDate
import java.io.File
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.Date
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.io.path.isDirectory
import kotlin.io.path.isRegularFile

fun Application.configureRouting(userStore: UserStore) {
    routing {
        post("/login") {
            val requestCookies = call.request.cookies
            val responseCookies = call.response.cookies

            val formParams = try {call.receiveParameters()} catch (ex: ContentTransformationException) {
                if (requestCookies["token"] != null) responseCookies.appendExpired("token")
                if (requestCookies["loggedIn"] != null) responseCookies.appendExpired("loggedIn")
                call.respondRedirect("/login?error=true")
                return@post
            }
            val username = formParams["username"].toString()
            val password = formParams["password"].toString()
            val user = userStore.getUserByUsername(username)

            if (user == null || !PasswordUtils.verifyPassword(password, user.passwordSalt, user.passwordHash)) {
                if (requestCookies["token"] != null) responseCookies.appendExpired("token")
                if (requestCookies["loggedIn"] != null) responseCookies.appendExpired("loggedIn")
                call.respondRedirect("/login?error=true")
                return@post
            }

            val tokenExpiresAt = Instant.now().plus(30, ChronoUnit.DAYS)
            val token = JWTUtils.createToken(user.id, Date.from(tokenExpiresAt))
            responseCookies.append(
                "token",
                value = token,
                httpOnly = true,
                expires = tokenExpiresAt.toGMTDate()
            )
            responseCookies.append(
                "loggedIn",
                value = "true",
                expires = tokenExpiresAt.toGMTDate()
            )

            val redirectPath = call.request.queryParameters["redir"]
            call.respondRedirect(redirectPath ?: "/")
        }

        get("/{...}") {
            val path = Path("./dist" + call.request.path())

            if (path.exists() && path.isRegularFile()) {
                call.respondFile(path.toFile())
            } else {
                call.respondFile(File("./dist/index.html"))
            }
        }
    }
}
