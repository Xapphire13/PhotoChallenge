package com.xapphire13.routes

import com.sksamuel.scrimage.ImmutableImage
import com.sksamuel.scrimage.nio.JpegWriter
import com.xapphire13.models.UploadType
import com.xapphire13.storage.FileStorage
import io.ktor.application.call
import io.ktor.features.BadRequestException
import io.ktor.features.UnsupportedMediaTypeException
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveStream
import io.ktor.response.respond
import io.ktor.routing.Routing
import io.ktor.routing.put
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

fun Routing.imageRoutes(fileStorage: FileStorage) {
    put("/upload/{uploadType}/{id}") {
        call.parameters["uploadType"]?.let { UploadType.valueOf(it.uppercase()) }
            ?: throw BadRequestException("No upload type provided")
        val id = call.parameters["id"] ?: throw BadRequestException("No id provided")
        val originalContentType =
            call.request.headers["content-type"]?.let { ContentType.parse(it) } ?: throw BadRequestException("Content type not provided")
        var newImageBytes: ByteArray

        if (!originalContentType.match(ContentType.Image.Any)) {
            throw UnsupportedMediaTypeException(originalContentType)
        }

        withContext(Dispatchers.IO) {
            call.receiveStream().use { stream ->
                val image = ImmutableImage.loader().fromStream(stream)
                newImageBytes = image.bound(2000, 2000).bytes(JpegWriter())
            }
        }

        fileStorage.uploadFile(id, "image/jpeg", newImageBytes)

        call.respond(HttpStatusCode.Created)
    }
}
