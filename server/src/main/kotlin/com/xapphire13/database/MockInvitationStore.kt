package com.xapphire13.database

import com.xapphire13.models.Invitation
import com.xapphire13.utils.generateId

val invitations = mutableListOf<Invitation>()

class MockInvitationStore : InvitationStore {
    override suspend fun getInvitationsForUser(userId: String): List<Invitation> {
        return invitations
    }

    override suspend fun createInvitation(userId: String, groupId: String): Invitation {
        val newInvitation = Invitation(
            id = generateId(),
            createdById = userId,
            groupId = groupId
        )

        invitations.add(newInvitation)

        return newInvitation
    }
}
