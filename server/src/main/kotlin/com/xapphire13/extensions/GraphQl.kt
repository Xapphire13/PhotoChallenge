package com.xapphire13.extensions

import com.apurebase.kgraphql.schema.execution.Execution

fun Execution.getChildNodes(): List<Execution.Node> = when (this) {
    is Execution.Node -> this.children.filterIsInstance<Execution.Node>()
    else -> listOf()
}
