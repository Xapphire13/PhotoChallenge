package com.xapphire13.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.storage.FileStorage

fun SchemaBuilder.fileSchema(fileStorage: FileStorage) {
    mutation("createUploadUrl") { resolver { -> fileStorage.createUploadUrl() } }

    mutation("deleteFile") {
        resolver { id: String -> fileStorage.deleteFile(id) }.withArgs {
            arg<String> { name = "id" }
        }
    }
}
