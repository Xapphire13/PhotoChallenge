package com.xapphire13.models

data class Upload(
    val id: String,
    val uploadedById: String,
    val caption: String? = null
)
