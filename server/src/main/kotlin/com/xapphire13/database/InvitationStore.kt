package com.xapphire13.database

import com.xapphire13.models.Invitation

interface InvitationStore {
    suspend fun getInvitationsForUser(userId: String): List<Invitation>
    suspend fun createInvitation(userId: String, groupId: String): Invitation
}
