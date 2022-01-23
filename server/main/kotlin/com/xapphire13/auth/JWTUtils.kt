package com.xapphire13.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import java.time.Instant
import java.util.Date

class JWTUtils {
    companion object {
        // TODO, remove once all tokens are updated
        private val oldAlgorithm: Algorithm = Algorithm.HMAC256(System.getenv("OLD_JWT_SECRET"))
        private val algorithm: Algorithm = Algorithm.HMAC256(System.getenv("JWT_SECRET"))
        // TODO, remove once all tokens are updated
        private val oldVerifier: JWTVerifier = JWT.require(oldAlgorithm)
            .withIssuer("photo-challenge")
            .build()
        private val verifier: JWTVerifier = JWT.require(algorithm)
            .withIssuer("photo-challenge")
            .build()

        fun createToken(userId: String, expiresAt: Date): String {
            return JWT.create()
                .withIssuer("photo-challenge")
                .withSubject(userId)
                .withIssuedAt(Date.from(Instant.now()))
                .withExpiresAt(expiresAt)
                .sign(algorithm)
        }

        fun verifyOldToken(token: String): DecodedJWT {
            return oldVerifier.verify(token)
        }

        fun verifyToken(token: String): DecodedJWT {
            return verifier.verify(token)
        }
    }
}
