package com.xapphire13.database

import com.xapphire13.models.Frequency
import com.xapphire13.models.Group

val groups = mutableListOf(
    Group(
        id = "1",
        userIds = listOf("1"),
        frequency = Frequency.DAILY,
        name = "Daily Group"
    )
)

class MockGroupStore : GroupStore {
    override suspend fun listGroups(): List<Group> {
        return groups
    }

    override suspend fun getGroup(id: String): Group? {
        return this.listGroups().find { it.id == id }
    }

    override suspend fun addUserToGroup(groupId: String, userId: String) {
        groups.replaceAll {
            if (it.id == groupId) it.copy(
                userIds = buildList {
                    addAll(it.userIds)
                    add(userId)
                }
            ) else it
        }
    }
}
