package com.xapphire13.utils

import com.aventrix.jnanoid.jnanoid.NanoIdUtils
import java.util.Random

private const val alphabet = "abcdefghijklmnopqrstuvwxyz"

fun generateId(): String {
    return NanoIdUtils.randomNanoId(Random(), "$alphabet${alphabet.uppercase()}".toCharArray(), 10)
}
