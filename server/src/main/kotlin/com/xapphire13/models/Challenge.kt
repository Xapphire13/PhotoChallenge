package com.xapphire13.models

import java.time.Instant

data class Challenge(
    val id: String,
    val name: String,
    val createdBy: String,
    val endsAt: String?
)
