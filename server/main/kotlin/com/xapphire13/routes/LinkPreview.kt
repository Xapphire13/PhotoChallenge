package com.xapphire13.routes

import com.xapphire13.database.ChallengeStore
import com.xapphire13.extensions.getNormalizedName
import com.xapphire13.images.generateLinkPreview
import io.ktor.application.call
import io.ktor.html.respondHtml
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.request.host
import io.ktor.request.port
import io.ktor.request.uri
import io.ktor.response.respond
import io.ktor.response.respondBytesWriter
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.utils.io.jvm.javaio.toOutputStream
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.html.body
import kotlinx.html.head
import kotlinx.html.meta
import kotlinx.html.script
import kotlinx.html.unsafe
import javax.imageio.ImageIO

fun Routing.linkPreviewRoutes(challengeStore: ChallengeStore) {
    get("/og/{challengeId}") {
        val challengeId = call.parameters["challengeId"] ?: throw Error("No challenge ID found")
        val challenge = challengeStore.getChallenge(challengeId) ?: let {
            call.respond(HttpStatusCode.NotFound)
            return@get
        }

        val img = generateLinkPreview(challenge)

        call.respondBytesWriter(contentType = ContentType.Image.PNG) {
            withContext(Dispatchers.IO) {
                ImageIO.write(img, "png", this@respondBytesWriter.toOutputStream())
            }
        }
    }

    get("/share/challenge/{challengeId}") {
        val challengeId = call.parameters["challengeId"] ?: throw Error("No challenge ID found")
        val challenge = challengeStore.getChallenge(challengeId) ?: let {
            call.respond(HttpStatusCode.NotFound)
            return@get
        }

        val protocol =
            if (call.request.headers["X-Forwarded-Proto"] == "https" || call.request.uri.startsWith("https"))
                "https://"
            else
                "http://"
        val host = protocol + call.request.host() + let {
            if (call.request.port() != 80) {
                ":${call.request.port()}"
            } else {
                ""
            }
        }

        call.respondHtml(HttpStatusCode.OK) {
            head {
                meta(content = "Today's challenge is ${challenge.getNormalizedName()}") {
                    attributes["property"] = "og:title"
                }
                meta(content = "Sign in to add more challenges and join in on the fun!") {
                    attributes["property"] = "og:description"
                }
                meta(content = "${host}/og/$challengeId") {
                    attributes["property"] = "og:image"
                }
            }

            body {
                script(type = "text/javascript") {
                    unsafe {
                        +"document.location = \"/\";"
                    }
                }
            }
        }
    }
}