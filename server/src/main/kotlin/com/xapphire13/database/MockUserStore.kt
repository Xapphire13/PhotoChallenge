package com.xapphire13.database

import com.xapphire13.auth.PasswordUtils
import com.xapphire13.models.User
import com.xapphire13.utils.generateId

val users = mutableListOf(
    User(
        id = "1",
        username = "Admin",
        email = "admin@photochallenge.com",
        isAdmin = true,
        passwordHash = "",
        passwordSalt = "",
    ).let {
        val password = "password1"
        val passwordSalt = PasswordUtils.generateSalt()
        val hashedPassword = PasswordUtils.generateHash(password + passwordSalt)
        it.copy(
            passwordHash = hashedPassword,
            passwordSalt = passwordSalt
        )
    }
)

class MockUserStore : UserStore {
    override suspend fun listUsers(): List<User> {
        return users
    }

    override suspend fun getUser(id: String): User? {
        return users.find { it.id == id }
    }

    override suspend fun getUserByUsername(username: String): User? {
        return users.find { it.username.lowercase() == username.lowercase() }
    }

    override suspend fun createUser(username: String, email: String, password: String, invitationCode: String) {
        val passwordSalt = PasswordUtils.generateSalt()
        val hashedPassword = PasswordUtils.generateHash(password + passwordSalt)

        users.add(
            User(
                id = generateId(),
                username = username,
                email = email,
                isAdmin = false,
                passwordHash = hashedPassword,
                passwordSalt = passwordSalt,
            )
        )
    }
}
