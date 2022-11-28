package com.xapphire13.routes

import com.xapphire13.auth.JWTUtils
import com.xapphire13.auth.PasswordUtils
import com.xapphire13.database.UserStore
import io.ktor.http.CookieEncoding
import io.ktor.server.application.call
import io.ktor.server.request.ContentTransformationException
import io.ktor.server.request.receiveParameters
import io.ktor.server.response.respondRedirect
import io.ktor.server.routing.Routing
import io.ktor.server.routing.post
import io.ktor.server.util.toGMTDate
import io.ktor.util.date.GMTDate
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.Date

fun Routing.loginRoutes(userStore: UserStore) {
    post("/login") {
        val requestCookies = call.request.cookies
        val responseCookies = call.response.cookies

        val formParams = try {
            call.receiveParameters()
        } catch (ex: ContentTransformationException) {
            if (requestCookies["token"] != null) responseCookies.append(
                "token",
                "",
                CookieEncoding.URI_ENCODING,
                0L,
                GMTDate()
            )
            if (requestCookies["loggedIn"] != null) responseCookies.append(
                "loggedIn",
                "",
                CookieEncoding.URI_ENCODING,
                0L,
                GMTDate(),
            )
            call.respondRedirect("/login?error=true")
            return@post
        }
        val username = formParams["username"].toString()
        val password = formParams["password"].toString()
        val user = userStore.getUserByUsername(username)

        if (user == null || !PasswordUtils.verifyPassword(password, user.passwordSalt, user.passwordHash)) {
            if (requestCookies["token"] != null) responseCookies.append(
                "token",
                "",
                CookieEncoding.URI_ENCODING,
                0L,
                GMTDate()
            )
            if (requestCookies["loggedIn"] != null) responseCookies.append(
                "loggedIn",
                "",
                CookieEncoding.URI_ENCODING,
                0L,
                GMTDate(),
            )
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
}
