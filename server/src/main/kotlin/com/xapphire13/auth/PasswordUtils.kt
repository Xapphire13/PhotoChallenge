package com.xapphire13.auth

import java.math.BigInteger
import java.security.MessageDigest
import kotlin.random.Random

class PasswordUtils {
    companion object {
        fun generateSalt(): String {
            val builder = StringBuilder()

            for (i in 1..8) {
                val randomNumber = Random.nextInt() % 16
                val hex = if (randomNumber == 0) "0" else Integer.toHexString(randomNumber)

                builder.append(hex)
            }

            return builder.toString()
        }

        fun generateHash(saltedPassword: String): String {
            val md = MessageDigest.getInstance("SHA-256")
            val bytes = md.digest(saltedPassword.toByteArray())
            val number = BigInteger(1, bytes)

            val hexString = StringBuilder(number.toString(16))

            while (hexString.length < 32) {
                hexString.insert(0, '0')
            }

            return hexString.toString()
        }

        fun verifyPassword(password: String, salt: String, hashedPassword: String): Boolean {
            return generateHash(password + salt) == hashedPassword
        }
    }
}