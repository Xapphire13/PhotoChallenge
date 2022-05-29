package com.xapphire13.database

import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.models.Feature
import kotlinx.coroutines.awaitAll

class FeatureStore(db: Firestore) {
    private val featureCollection = db.collection("features")

    suspend fun listFeatures(): List<Feature> {
        val documents = this.featureCollection.listDocuments().map { it.get().asDeferred() }.awaitAll()

        return documents.map {
            Feature(
                id = it.id,
                userIds = it.get("users") as? List<String> ?: emptyList()
            )
        }
    }
}
