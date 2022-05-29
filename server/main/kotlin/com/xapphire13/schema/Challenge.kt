package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.apurebase.kgraphql.schema.execution.Execution
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.UploadStore
import com.xapphire13.extensions.getChildNodes
import com.xapphire13.models.FutureChallengeCountResponse
import com.xapphire13.models.RequestContext

fun SchemaBuilder.challengeSchema(challengeStore: ChallengeStore, uploadStore: UploadStore) {
    query("challenges") { resolver { -> challengeStore.listChallenges() } }

    query("challenge") {
        resolver { id: String, execution: Execution.Node ->
            val uploadsNode = execution.getChildNodes().find { it.key == "uploads" }
            val challenge = challengeStore.getChallenge(id)

            if (uploadsNode !== null && challenge !== null) {
                val includeUser = uploadsNode.getChildNodes().any { it.key == "uploadedBy" }
                val includeUrl = uploadsNode.getChildNodes().any { it.key == "url" }
                val uploads = uploadStore.getUploads(id, includeUser, includeUrl)

                return@resolver challenge.copy(uploads = uploads)
            }

            challenge
        }
            .withArgs { arg<String> { name = "id" } }
    }

    query("currentChallenge") {
        resolver { execution: Execution.Node ->
            val uploadsNode = execution.getChildNodes().find { it.key == "uploads" }
            val challenge = challengeStore.getCurrentChallenge()

            if (uploadsNode !== null && challenge !== null) {
                val includeUser = uploadsNode.getChildNodes().any { it.key == "uploadedBy" }
                val includeUrl = uploadsNode.getChildNodes().any { it.key == "url" }
                val uploads = uploadStore.getUploads(challenge.id, includeUser, includeUrl)

                return@resolver challenge.copy(uploads = uploads)
            }

            challenge
        }
    }

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
