package com.xapphire13.concurrency

import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit

class SynchronizedValue<T : Any>(
    initialValue: T? = null
) {
    private var value: T? = initialValue
    private val semaphore = Semaphore(1)

    suspend fun getValue() = semaphore.withPermit { value }

    suspend fun getOrSetValue(fallback: suspend () -> T): T = semaphore.withPermit {
        return value ?: fallback().apply {
            value = this
        }
    }

    suspend fun setValue(newValue: T) = semaphore.withPermit { value = newValue }

    suspend fun setValue(updater: (previousValue: T?) -> T?) = semaphore.withPermit { value = updater(value) }
}
