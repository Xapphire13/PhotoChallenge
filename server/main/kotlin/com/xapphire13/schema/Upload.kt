package com.xapphire13.schema

import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.google.cloud.storage.HttpMethod
import com.google.cloud.storage.Storage
import com.xapphire13.database.UserStore
import com.xapphire13.models.Upload
import com.xapphire13.models.User
import com.xapphire13.storage.FileStorage
import java.util.concurrent.TimeUnit

fun SchemaBuilder.uploadSchema(userStore: UserStore, fileStorage: FileStorage) {
    type<Upload> {
        property(Upload::uploadedById) {
            ignore = true
        }

        property<String>("url") {
            resolver { parent ->
                val blob = fileStorage.getFile(parent.id)
                blob?.signUrl(
                    30,
                    TimeUnit.MINUTES,
                    Storage.SignUrlOption.httpMethod(
                        HttpMethod.GET
                    ),
                    Storage.SignUrlOption.withV4Signature()
                )
                    ?.toString() ?: throw GraphQLError("Error creating download URL")
            }
        }

        property<User>("uploadedBy") {
            resolver { parent -> userStore.getUser(parent.uploadedById) ?: throw GraphQLError("Couldn't fetch user with id ${parent.uploadedById}") }
        }
    }
}
