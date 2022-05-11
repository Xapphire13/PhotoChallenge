package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQL
import com.apurebase.kgraphql.GraphQLError
import com.auth0.jwt.exceptions.JWTVerificationException
import com.xapphire13.auth.JWTUtils
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UploadStore
import com.xapphire13.database.UserStore
import com.xapphire13.models.RequestContext
import com.xapphire13.models.User
import com.xapphire13.storage.FileStorage
import io.ktor.application.Application
import io.ktor.application.install

fun Application.configureSchema(
        userStore: UserStore,
        invitationStore: InvitationStore,
        challengeStore: ChallengeStore,
        fileStorage: FileStorage,
        uploadStore: UploadStore
) {
    install(GraphQL) {
        playground = true
        wrapErrors = true

        context { call ->
            val token = call.request.cookies["token"]
            val verifiedToken =
                    token?.let {
                        try {
                            JWTUtils.verifyToken(token)
                        } catch (ex: JWTVerificationException) {
                            null
                        }
                    }

            if (verifiedToken != null) {
                +RequestContext(userId = verifiedToken.subject)
            }
        }

        schema {
            type<User>() {
                property(User::passwordHash) { ignore = true }

                property(User::passwordSalt) { ignore = true }
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

            invitationSchema(invitationStore)
            challengeSchema(challengeStore, uploadStore)
            fileSchema(fileStorage, uploadStore)
        }
    }
}
