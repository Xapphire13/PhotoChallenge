package com.xapphire13.models

data class Challenge(
    val id: String,
    val groupId: String,
    val name: String,
    val createdBy: String,
    val endsAt: String? = null,
)
