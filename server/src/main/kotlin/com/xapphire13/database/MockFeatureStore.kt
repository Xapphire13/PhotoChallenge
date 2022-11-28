package com.xapphire13.database

import com.xapphire13.models.Feature

class MockFeatureStore : FeatureStore {
    override suspend fun listFeatures(): List<Feature> {
        return listOf(
            Feature("TEST_FEATRUE", listOf("1"))
        )
    }
}
