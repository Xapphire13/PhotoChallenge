package com.xapphire13.schema

import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.*
import com.xapphire13.models.Challenge
import com.xapphire13.models.Frequency
import com.xapphire13.models.Group
import com.xapphire13.models.User

fun SchemaBuilder.groupSchema(groupStore: GroupStore, challengeStore: ChallengeStore, userStore: UserStore) {
    enum<Frequency> { }

    type<Group> {
        property(Group::userIds) {
            ignore = true
        }

        property<Challenge?>("challenge") {
            resolver { parent, id: String ->
                challengeStore.getChallenge(parent.id, id)
            }
        }

        property<List<Challenge>>("challenges") {
            resolver { parent ->
                challengeStore.listChallenges(parent.id)
            }
        }

        property<Challenge?>("currentChallenge") {
            resolver { parent ->
                challengeStore.getCurrentChallenge(parent.id)
            }
        }

        property<List<Challenge>>("pastChallenges") { resolver { parent -> challengeStore.getPastChallenges(parent.id) } }

        property<Int>("futureChallengeCount") {
            resolver { parent ->
                challengeStore.getFutureChallengeCount(parent.id)
            }
        }

        property<List<User>>("users") {
            resolver { parent ->
                parent.userIds.mapNotNull { id -> userStore.getUser(id) }
            }
        }
    }

    query("group") {
        resolver { id: String -> groupStore.getGroup(id) }
    }
}
