package com.xapphire13.extensions

import com.google.api.core.ApiFuture
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.asExecutor

fun <T> ApiFuture<T>.asDeferred(dispatcher: CoroutineDispatcher = Dispatchers.Default): Deferred<T> {
    val deferred = CompletableDeferred<T>()

    this.addListener(
        {
            try {
                val result = this.get()
                deferred.complete(result)
            } catch (@Suppress("TooGenericExceptionCaught") ex: Exception) {
                deferred.completeExceptionally(ex)
            }
        },
        dispatcher.asExecutor()
    )

    return deferred
}

suspend fun <T> ApiFuture<T>.await(dispatcher: CoroutineDispatcher = Dispatchers.Default): T {
    return this.asDeferred(dispatcher).await()
}
