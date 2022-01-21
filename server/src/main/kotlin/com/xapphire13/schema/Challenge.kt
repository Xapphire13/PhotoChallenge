package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.ChallengeStore
import com.xapphire13.models.RequestContext
import com.xapphire13.models.UnitResponse

fun SchemaBuilder.challengeSchema(challengeStore: ChallengeStore) {
    query("challenges") {
        resolver { ->
            challengeStore.listChallenges()
        }
    }

    query("challenge") {
        resolver { id: String ->
            challengeStore.getChallenge(id)
        }.withArgs {
            arg<String> { name = "id" }
        }
    }

    query("currentChallenge") {
        resolver { ->
            challengeStore.getCurrentChallenge()
        }
    }

    query("pastChallenges") {
        resolver { ->
            challengeStore.getPastChallenges()
        }
    }

    query("futureChallenges") {
        resolver { ->
            challengeStore.getFutureChallenges()
        }
    }

    mutation("addChallenge") {
        resolver { name: String, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            challengeStore.addChallenge(name, requestContext.userId)
            UnitResponse()
        }.withArgs {
            arg<String> { name = "name"}
        }
    }
}