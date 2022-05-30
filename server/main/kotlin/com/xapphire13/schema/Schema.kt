package com.xapphire13.schema

import com.apurebase.kgraphql.GraphQL
import com.auth0.jwt.exceptions.JWTVerificationException
import com.xapphire13.auth.JWTUtils
import com.xapphire13.database.ChallengeStore
import com.xapphire13.database.FeatureStore
import com.xapphire13.database.GroupStore
import com.xapphire13.database.InvitationStore
import com.xapphire13.database.UploadStore
import com.xapphire13.database.UserStore
import com.xapphire13.models.RequestContext
import com.xapphire13.storage.FileStorage
import io.ktor.application.Application
import io.ktor.application.install

fun Application.configureSchema(
    userStore: UserStore,
    invitationStore: InvitationStore,
    challengeStore: ChallengeStore,
    fileStorage: FileStorage,
    uploadStore: UploadStore,
    groupStore: GroupStore,
    featureStore: FeatureStore
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
            invitationSchema(invitationStore)
            challengeSchema(challengeStore, uploadStore)
            fileSchema(fileStorage, uploadStore)
            groupSchema(groupStore, challengeStore, userStore)
            uploadSchema(userStore, fileStorage)
            userSchema(userStore, featureStore)
        }
    }
}
