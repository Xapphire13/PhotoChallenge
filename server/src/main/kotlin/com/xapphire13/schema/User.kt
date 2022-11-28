package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.*
import com.xapphire13.models.Group
import com.xapphire13.models.RequestContext
import com.xapphire13.models.User

fun SchemaBuilder.userSchema(userStore: UserStore, featureStore: FeatureStore, groupStore: GroupStore) {
    type<User> {
        property(User::passwordHash) { ignore = true }
        property(User::passwordSalt) { ignore = true }

        property<List<String>>("features") {
            resolver { parent ->
                featureStore.listFeatures().filter { it.userIds.contains(parent.id) }.map { it.id }
            }
        }

        property<List<Group>>("groups") {
            resolver { parent ->
                groupStore.listGroups().filter { it.userIds.contains(parent.id) }
            }
        }
    }

    query("users") {
        resolver { -> userStore.listUsers() }

        accessRule { ctx: Context ->
            val requestContext = ctx.get<RequestContext>()

            if (requestContext == null) GraphQLError("Unauthorized") else null
        }
    }

    query("user") {
        resolver { id: String -> userStore.getUser(id) }.withArgs {
            arg<String> {
                name = "id"
                description = "The user ID"
            }
        }
    }

    query("me") {
        resolver { ctx: Context ->
            val requestContext =
                ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

            userStore.getUser(requestContext.userId)
        }
    }

    mutation("createUser") {
        resolver {
            username: String,
            email: String,
            password: String,
            invitationCode: String,
            ctx: Context ->
            val requestContext = ctx.get<RequestContext>()

            if (requestContext != null) {
                throw GraphQLError("You already have an account")
            }

            userStore.createUser(username, email, password, invitationCode)
            true
        }
    }
}
