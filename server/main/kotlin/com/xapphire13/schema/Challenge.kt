package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.helpers.getFields
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.apurebase.kgraphql.schema.execution.Execution
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UploadStore
import com.xapphire13.models.FutureChallengeCountResponse
import com.xapphire13.models.RequestContext
import com.xapphire13.models.User

fun SchemaBuilder.challengeSchema(challengeStore: ChallengeStore, uploadStore: UploadStore) {
    query("challenges") { resolver { -> challengeStore.listChallenges() } }

    query("challenge") {
        resolver { id: String, execution: Execution ->
            val includeUploads = execution.getFields().contains("uploads")
            var challenge = challengeStore.getChallenge(id)

            if (includeUploads && challenge !== null) {
                val includeUser = execution.getFields().contains("uploads.uploadedBy")
                val uploads =
                        uploadStore.getUploads(id).map {
                            if (includeUser) {
                                return@map it.copy(uploadedBy = User("", "", "", false, "", ""))
                            }

                            it
                        }

                challenge = challenge.copy(uploads = uploads)
            }

            challenge
        }
                .withArgs { arg<String> { name = "id" } }
    }

    query("currentChallenge") { resolver { -> challengeStore.getCurrentChallenge() } }

    query("pastChallenges") { resolver { -> challengeStore.getPastChallenges() } }

    query("futureChallengeCount") {
        resolver { ->
            FutureChallengeCountResponse(count = challengeStore.getFutureChallengeCount())
        }
    }

    mutation("addChallenge") {
        resolver { name: String, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            challengeStore.addChallenge(name, requestContext.userId)
            true
        }
                .withArgs { arg<String> { name = "name" } }
    }
}
