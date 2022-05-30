package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UploadStore
import com.xapphire13.models.Challenge
import com.xapphire13.models.RequestContext
import com.xapphire13.models.Upload

fun SchemaBuilder.challengeSchema(challengeStore: ChallengeStore, uploadStore: UploadStore) {
    type<Challenge> {
        property<List<Upload>>("uploads") {
            resolver { parent ->
                uploadStore.getUploads(parent.groupId, parent.id)
            }
        }
    }

    mutation("addChallenge") {
        resolver { groupId: String, name: String, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            challengeStore.addChallenge(groupId, name, requestContext.userId)
            true
        }
            .withArgs {
                arg<String> { name = "groupId" }
                arg<String> { name = "name" }
            }
    }
}
