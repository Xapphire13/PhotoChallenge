package com.xapphire13.models

data class User(
    val id: String,
    val username: String,
    val email: String,
    val isAdmin: Boolean,
    val passwordHash: String,
    val passwordSalt: String,
)
