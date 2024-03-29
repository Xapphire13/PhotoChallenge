package com.xapphire13.database

import com.google.cloud.firestore.DocumentReference
import com.google.cloud.firestore.Firestore
import com.xapphire13.extensions.asDeferred
import com.xapphire13.models.Feature
import kotlinx.coroutines.awaitAll

class FirebaseFeatureStore(db: Firestore) : FeatureStore {
    private val featureCollection = db.collection("features")

    override suspend fun listFeatures(): List<Feature> {
        val documents = this.featureCollection.listDocuments().map { it.get().asDeferred() }.awaitAll()

        return documents.map {
            Feature(
                id = it.id,
                userIds = (it.get("users") as? List<*>)?.filterIsInstance<DocumentReference>()?.map { user -> user.id } ?: emptyList()
            )
        }
    }
}
