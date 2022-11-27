package com.xapphire13.extensions

import com.xapphire13.models.Challenge

fun Challenge.getNormalizedName() = this.name.substring(0, 1).lowercase() + this.name.substring(1)
