package com.xapphire13.models

data class Challenge(
    val id: String,
    val name: String,
    val createdBy: String,
    val endsAt: String? = null,
    val uploads: List<Upload>? = null
)
