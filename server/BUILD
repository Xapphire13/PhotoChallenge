load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kt_jvm_library", "kt_jvm_binary")
load("@io_bazel_rules_kotlin//kotlin:core.bzl", "define_kt_toolchain")

define_kt_toolchain(
    name = "kotlin_toolchain",
    api_version = "1.8",
    jvm_target = "11",
    language_version = "1.8",
)

kt_jvm_binary(
  name = "server_app",
  main_class = "com.xapphire13.ApplicationKt",
  srcs = glob(["src/main/kotlin/**/*.kt"]),
  resources = glob(["src/main/resources/**/*"]),
  deps = [
    "@maven//:ch_qos_logback_logback_classic",
    "@maven//:com_apurebase_kgraphql_ktor",
    "@maven//:com_apurebase_kgraphql",
    "@maven//:com_auth0_java_jwt",
    "@maven//:com_aventrix_jnanoid_jnanoid",
    "@maven//:com_google_cloud_google_cloud_storage",
    "@maven//:com_google_firebase_firebase_admin",
    "@maven//:com_sksamuel_scrimage_scrimage_core",
    "@maven//:io_github_reactivecircus_cache4k_cache4k_jvm",
    "@maven//:io_insert_koin_koin_core",
    "@maven//:io_insert_koin_koin_ktor",
    "@maven//:io_insert_koin_koin_logger_slf4j",
    "@maven//:io_ktor_ktor_server_core_jvm",
    "@maven//:io_ktor_ktor_server_html_builder_jvm",
    "@maven//:io_ktor_ktor_server_netty_jvm",
    "@maven//:org_jetbrains_kotlinx_kotlinx_coroutines_core",
    ],
)

java_binary(
    name = "server_app_fat",
    main_class = "com.xapphire13.ApplicationKt",
    runtime_deps = [":server_app"],
    jvm_flags = ["-Djava.awt.headless=true"],
)