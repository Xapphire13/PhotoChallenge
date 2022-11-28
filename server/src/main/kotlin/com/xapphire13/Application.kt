package com.xapphire13

import com.xapphire13.modules.productionModule
import com.xapphire13.routes.configureRouting
import com.xapphire13.schema.configureSchema
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

fun main() {
    embeddedServer(Netty, port = System.getenv("PORT").toInt(), host = "0.0.0.0") {
        install(Koin) {
            slf4jLogger()
            modules(productionModule)
        }
        configureSchema()
        configureRouting()
    }
        .start(wait = true)
}
