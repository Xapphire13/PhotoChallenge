package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.ChallengeStore
import com.xapphire13.models.FutureChallengeCountResponse
import com.xapphire13.models.RequestContext

fun SchemaBuilder.challengeSchema(challengeStore: ChallengeStore) {
    query("challenges") { resolver { -> challengeStore.listChallenges() } }

    query("challenge") {
        resolver { id: String -> challengeStore.getChallenge(id) }.withArgs {
            arg<String> { name = "id" }
        }
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
