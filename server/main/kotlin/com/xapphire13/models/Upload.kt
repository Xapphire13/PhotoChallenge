package com.xapphire13.models

data class Upload(
    val id: String,
    val url: String? = null,
    val uploadedBy: User? = null,
    val caption: String? = null
)
