package com.xapphire13.plugins

import com.xapphire13.auth.JWTUtils
import com.xapphire13.auth.PasswordUtils
import com.xapphire13.database.UserStore
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.features.ContentTransformationException
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveParameters
import io.ktor.response.*
import io.ktor.util.date.toGMTDate
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.Date

fun Application.configureRouting(userStore: UserStore) {
    routing {
        post("/login") {
            val cookies = call.response.cookies

            val formParams = try {call.receiveParameters()} catch (ex: ContentTransformationException) {
                if (cookies["token"] != null) cookies.appendExpired("token")
                call.respond(HttpStatusCode.Unauthorized, "Incorrect username/password")
                return@post
            }
            val username = formParams["username"].toString()
            val password = formParams["password"].toString()
            val user = userStore.getUserByUsername(username)

            if (user == null || !PasswordUtils.verifyPassword(password, user.passwordSalt, user.passwordHash)) {
                if (cookies["token"] != null) cookies.appendExpired("token")
                call.respond(HttpStatusCode.Unauthorized, "Incorrect username/password")
                return@post
            }

            val tokenExpiresAt = Instant.now().plus(30, ChronoUnit.DAYS)
            val token = JWTUtils.createToken(user.id, Date.from(tokenExpiresAt))
            cookies.append(
                "token",
                value = token,
                httpOnly = true,
                expires = tokenExpiresAt.toGMTDate()
            )

            call.respondRedirect("/")
        }
    }
}
