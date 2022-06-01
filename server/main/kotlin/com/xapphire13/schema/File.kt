package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.UploadStore
import com.xapphire13.models.CreateUploadUrlResponse
import com.xapphire13.models.RequestContext
import com.xapphire13.models.UploadInput
import com.xapphire13.storage.FileStorage
import com.xapphire13.utils.generateId
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll

fun SchemaBuilder.fileSchema(fileStorage: FileStorage, uploadStore: UploadStore) {
    type<UploadInput>()

    mutation("createUploadUrl") {
        resolver { ctx: Context ->
            ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            val id = generateId()

            CreateUploadUrlResponse(id, uploadUrl = "/upload/challenge/$id")
        }
    }

    mutation("deleteFile") {
        resolver { id: String, ctx: Context ->
            ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            fileStorage.deleteFile(id)
        }
            .withArgs { arg<String> { name = "id" } }
    }

    mutation("submitUploads") {
        resolver { groupId: String, uploads: List<UploadInput>, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            val scope = CoroutineScope(context = Dispatchers.IO)

            uploads
                .map {
                    scope.async {
                        uploadStore.addUpload(groupId, it.id, requestContext.userId, it.caption)
                    }
                }
                .awaitAll()

            true
        }
            .withArgs { arg<List<UploadInput>> { name = "uploads" } }
    }
}
