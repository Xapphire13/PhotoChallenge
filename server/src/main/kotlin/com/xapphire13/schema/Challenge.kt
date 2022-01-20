package com.xapphire13.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.ChallengeStore

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
}