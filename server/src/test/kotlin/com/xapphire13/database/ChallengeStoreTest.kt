package com.xapphire13.database

import com.google.api.core.ApiFuture
import com.google.cloud.Timestamp
import com.google.cloud.firestore.CollectionReference
import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.Firestore
import com.google.cloud.firestore.Query
import com.google.cloud.firestore.QueryDocumentSnapshot
import com.google.cloud.firestore.QuerySnapshot
import io.kotest.core.annotation.Ignored
import io.kotest.core.spec.style.DescribeSpec
import io.kotest.matchers.shouldBe
import io.mockk.MockKStubScope
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkStatic
import io.mockk.slot
import java.time.Instant
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.util.Date

private fun <T> createMockApiFuture(value: T): ApiFuture<T> {
    val apiFuture = mockk<ApiFuture<T>>()

    every {
        apiFuture.get()
    }.returns(value)

    val slot = slot<Runnable>()
    every {
        apiFuture.addListener(capture(slot), any())
    }.answers {
        slot.captured.run()
    }

    return apiFuture
}

private fun mockQuery(
    matcher: () -> MockKStubScope<Query, Query>,
    result: () -> QueryDocumentSnapshot?
) {
    val queryDocumentSnapshot = result()
    val querySnapshot = mockk<QuerySnapshot>()

    every {
        querySnapshot.iterator()
    }.answers {
        val iterator = mockk<MutableIterator<QueryDocumentSnapshot>>()

        every {
            iterator.hasNext()
        }.answers {
            queryDocumentSnapshot != null
        }

        every {
            iterator.next()
        }.answers {
            queryDocumentSnapshot!!
        }

        iterator
    }

    every {
        querySnapshot.documents
    }.returns(listOf(queryDocumentSnapshot))

    matcher().answers {
        val query = mockk<Query>()

        every {
            query.get()
        }.returns(createMockApiFuture(querySnapshot))

        every {
            query.limit(any())
        }.returns(query)

        query
    }
}

@Ignored
internal class ChallengeStoreTest : DescribeSpec({
    describe("getCurrentChallenge") {
        describe("when there is no current challenge") {
            it("sets the next challenge to end at 3PM UTC") {
                val firestore = mockk<Firestore>()
                val collection = mockk<CollectionReference>()

                mockkStatic(Instant::class)

                every {
                    Instant.now()
                }.returns(
                    ZonedDateTime.of(
                        2022,
                        1,
                        24,
                        0,
                        0,
                        0,
                        0,
                        ZoneOffset.UTC
                    ).toInstant()
                )

                every {
                    firestore.collection(any())
                }.returns(collection)

                mockQuery({
                    every {
                        collection.whereGreaterThan(any<String>(), any())
                    }
                }) {
                    null
                }

                val documentSnapshot = mockk<QueryDocumentSnapshot>()
                val documentReference = mockk<DocumentReference>()

                every {
                    documentSnapshot.reference
                }.returns(documentReference)

                val fieldName = slot<String>()
                every {
                    documentSnapshot.getString(capture(fieldName))
                }.answers { fieldName.captured }
                every {
                    documentSnapshot.getTimestamp(any())
                }.returns(Timestamp.now())
                every {
                    documentSnapshot.get(any<String>())
                }.returns(
                    mockk<DocumentReference>().let {
                        every {
                            it.id
                        }.returns("1234")

                        it
                    }
                )
                every {
                    documentSnapshot.id
                }.returns("1234")

                val endsAt = slot<Timestamp>()
                every {
                    documentReference.update(any<String>(), capture(endsAt))
                }.returns(createMockApiFuture(mockk()))

                mockQuery({
                    every {
                        collection.whereEqualTo(any<String>(), any())
                    }
                }) {
                    documentSnapshot
                }

                val challengeStore = ChallengeStore(firestore)
                challengeStore.getCurrentChallenge("")

                endsAt.captured shouldBe Timestamp.of(
                    Date.from(
                        ZonedDateTime.of(
                            2022,
                            1,
                            24,
                            15,
                            0,
                            0,
                            0,
                            ZoneOffset.UTC
                        ).toInstant()
                    )
                )
            }
        }
    }
})
