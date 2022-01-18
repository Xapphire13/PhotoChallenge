package com.xapphire13.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import java.time.Instant
import java.util.Date

class JWTUtils {
    companion object {
        private val algorithm: Algorithm = Algorithm.HMAC256("secret")
        private val verifier: JWTVerifier = JWT.require(algorithm)
            .withIssuer("xapphire13")
            .build()

        fun createToken(userId: String, expiresAt: Date): String {
            return JWT.create()
                .withIssuer("xapphire13")
                .withSubject(userId)
                .withIssuedAt(Date.from(Instant.now()))
                .withExpiresAt(expiresAt)
                .sign(algorithm)
        }

        fun verifyToken(token: String): DecodedJWT {
            return verifier.verify(token)
        }
    }
}