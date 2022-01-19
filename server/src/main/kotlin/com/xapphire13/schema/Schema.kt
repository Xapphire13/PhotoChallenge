package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQL
import com.apurebase.kgraphql.GraphQLError
import com.auth0.jwt.exceptions.JWTVerificationException
import com.xapphire13.auth.JWTUtils
import com.xapphire13.database.UserStore
import com.xapphire13.models.RequestContext
import io.ktor.application.Application
import io.ktor.application.install

fun Application.configureSchema(userStore: UserStore) {
    install(GraphQL) {
        playground = true
        wrapErrors = true

        context { call ->
            val token = call.request.cookies["token"]
            val verifiedToken = token?.let {
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
            query("users") {
                resolver { -> userStore.listUsers() }

                accessRule { ctx: Context ->
                    val requestContext = ctx.get<RequestContext>()

                    if (requestContext == null) GraphQLError("Unauthorized")
                    else null
                }
            }

            query("user") {
                resolver { id: String ->
                    userStore.getUser(id)
                }.withArgs {
                    arg<String> {name = "id"; description = "The user ID"}
                }
            }

            query("me") {
                resolver {ctx: Context ->
                    val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")

                    userStore.getUser(requestContext.userId)
                }
            }
        }
    }
}