package com.xapphire13.database

import com.xapphire13.models.Group

interface GroupStore {
    suspend fun listGroups(): List<Group>
    suspend fun getGroup(id: String): Group?
    suspend fun addUserToGroup(groupId: String, userId: String)
}
