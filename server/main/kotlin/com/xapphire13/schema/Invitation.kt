package com.xapphire13.schema

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQLError
import com.apurebase.kgraphql.schema.dsl.SchemaBuilder
import com.xapphire13.database.InvitationStore
import com.xapphire13.models.RequestContext

fun SchemaBuilder.invitationSchema(invitationStore: InvitationStore) {
    mutation("createInvitation") {
        resolver { groupId: String, ctx: Context ->
            val requestContext = ctx.get<RequestContext>() ?: throw GraphQLError("Unauthorized")
            val existingInvitation = invitationStore.getInvitationsForUser(requestContext.userId)

            existingInvitation ?: invitationStore.createInvitation(requestContext.userId, groupId)
        }
    }
}
