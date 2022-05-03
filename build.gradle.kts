val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val kgraphql_version: String by project
val kotest_version: String by project
val mockk_version: String by project

group = "com.xapphire13"

version = "0.0.1"

plugins {
    application
    kotlin("jvm") version "1.6.10"
    id("com.github.johnrengelman.shadow") version "7.1.2"
    id("org.jlleitschuh.gradle.ktlint") version "10.2.1"
}

repositories { mavenCentral() }

sourceSets {
    main {
        java.srcDirs("server/main/kotlin")
        resources { srcDir("server/main/resources") }
    }

    test { java.srcDir("server/test/kotlin") }
}

application { mainClass.set("com.xapphire13.ApplicationKt") }

dependencies {
    implementation(platform("com.google.cloud:libraries-bom:25.2.0"))

    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("com.apurebase:kgraphql-ktor:$kgraphql_version")
    implementation("com.apurebase:kgraphql:$kgraphql_version")
    implementation("com.auth0:java-jwt:3.18.3")
    implementation("com.aventrix.jnanoid:jnanoid:2.0.0")
    implementation("com.google.cloud:google-cloud-storage")
    implementation("com.google.firebase:firebase-admin:8.1.0")
    implementation("io.ktor:ktor-html-builder:$ktor_version")
    implementation("io.ktor:ktor-server-core:$ktor_version")
    implementation("io.ktor:ktor-server-netty:$ktor_version")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0")

    testImplementation("io.kotest:kotest-assertions-core:$kotest_version")
    testImplementation("io.kotest:kotest-runner-junit5:$kotest_version")
    testImplementation("io.ktor:ktor-server-tests:$ktor_version")
    testImplementation("io.mockk:mockk:$mockk_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}

// "stage" task for Heroku
task("stage") { dependsOn += "shadowJar" }

tasks.withType<Test> { useJUnitPlatform() }
