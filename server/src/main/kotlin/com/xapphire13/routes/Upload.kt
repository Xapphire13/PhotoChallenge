package com.xapphire13.routes

import com.sksamuel.scrimage.ImmutableImage
import com.sksamuel.scrimage.nio.JpegWriter
import com.xapphire13.models.UploadType
import com.xapphire13.storage.FileStorage
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

fun Routing.uploadRoutes(fileStorage: FileStorage) {
    put("/upload/{uploadType}/{id}") {
        call.parameters["uploadType"]?.let { UploadType.valueOf(it.uppercase()) }
            ?: throw BadRequestException("No upload type provided")
        val id = call.parameters["id"] ?: throw BadRequestException("No id provided")
        val originalContentType =
            call.request.headers["content-type"]?.let { ContentType.parse(it) }
                ?: throw BadRequestException("Content type not provided")

        withContext(Dispatchers.IO) {
            when {
                originalContentType.match(ContentType.Image.Any) -> {
                    call.receiveStream().use { stream ->
                        val image = ImmutableImage.loader().fromStream(stream)
                        val newImageBytes = image.bound(2000, 2000).bytes(JpegWriter())
                        fileStorage.uploadFile(id, "image/jpeg", newImageBytes)
                    }
                }
                originalContentType.match(ContentType.Video.Any) -> {
                    call.receiveStream().use { stream ->
                        fileStorage.uploadFile(id, originalContentType.toString(), stream)
                    }
                }
                else -> throw UnsupportedMediaTypeException(originalContentType)
            }
        }

        call.respond(HttpStatusCode.Created)
    }
}
