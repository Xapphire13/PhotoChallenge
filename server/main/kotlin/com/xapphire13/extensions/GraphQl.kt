package com.xapphire13.extensions

import com.apurebase.kgraphql.schema.execution.Execution

fun Execution.getFields(): List<String> =
    when (this) {
      is Execution.Node ->
          children.filter { it is Execution.Node }.map { if (it is Execution.Node) it.key else "" }
      else -> listOf()
    }.distinct()
