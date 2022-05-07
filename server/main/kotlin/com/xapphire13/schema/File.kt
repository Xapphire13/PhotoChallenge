package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.UploadStore
import com.xapphire13.models.RequestContext
import com.xapphire13.models.UploadInput
import com.xapphire13.storage.FileStorage

fun SchemaBuilder.fileSchema(fileStorage: FileStorage, uploadStore: UploadStore) {
    type<UploadInput>()

    mutation("createUploadUrl") {
        resolver { ctx: Context ->
            ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            fileStorage.createUploadUrl()
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
        resolver { uploads: List<UploadInput>, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            uploads.forEach { uploadStore.addUpload(it.id, requestContext.userId, it.caption) }

            true
        }
            .withArgs { arg<List<UploadInput>> { name = "uploads" } }
    }
}
