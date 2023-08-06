workspace(name = "photo_challenge")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

rules_kotlin_version = "1.8"
rules_kotlin_sha = "01293740a16e474669aba5b5a1fe3d368de5832442f164e4fbfc566815a8bc3a"
http_archive(
    name = "io_bazel_rules_kotlin",
    urls = ["https://github.com/bazelbuild/rules_kotlin/releases/download/v%s/rules_kotlin_release.tgz" % rules_kotlin_version],
    sha256 = rules_kotlin_sha,
)

load("@io_bazel_rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories", "kotlinc_version", "versions")
kotlin_repositories(
    compiler_release = kotlinc_version(
        release = "1.9.0",
        sha256 = "1fc50d805f9809e92de43e91f089cc8618567c1a350faebdabf8a40c5048bee8"
    )
)

register_toolchains("//server:kotlin_toolchain")

http_archive(
    name = "rules_jvm_external",
    sha256 = versions.RULES_JVM_EXTERNAL_SHA,
    strip_prefix = "rules_jvm_external-%s" % versions.RULES_JVM_EXTERNAL_TAG,
    url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % versions.RULES_JVM_EXTERNAL_TAG,
)

load("@rules_jvm_external//:defs.bzl", "maven_install")

ktor_version = "2.3.3"
kgraphql_version = "0.19.0"
koin_version = "3.2.2"
maven_install(
    artifacts = [
        "ch.qos.logback:logback-classic:1.2.10",
        "com.apurebase:kgraphql-ktor:%s" % kgraphql_version,
        "com.apurebase:kgraphql:%s" % kgraphql_version,
        "com.auth0:java-jwt:3.18.3",
        "com.aventrix.jnanoid:jnanoid:2.0.0",
        "com.google.cloud:google-cloud-storage:2.6.1",
        "com.google.firebase:firebase-admin:8.1.0",
        "com.sksamuel.scrimage:scrimage-core:4.0.31",
        "io.github.reactivecircus.cache4k:cache4k-jvm:0.6.0",
        "io.insert-koin:koin-core:%s" % koin_version,
        "io.insert-koin:koin-ktor:%s" % koin_version,
        "io.insert-koin:koin-logger-slf4j:%s" % koin_version,
        "io.ktor:ktor-server-core-jvm:%s" % ktor_version,
        "io.ktor:ktor-server-html-builder-jvm:%s" % ktor_version,
        "io.ktor:ktor-server-netty-jvm:%s" % ktor_version,
        "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0",
    ],
    repositories = [
        "https://maven.google.com",
        "https://repo1.maven.org/maven2",
    ],
)
