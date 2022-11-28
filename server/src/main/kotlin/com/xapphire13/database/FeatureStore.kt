package com.xapphire13.database

import com.xapphire13.models.Feature

interface FeatureStore {
    suspend fun listFeatures(): List<Feature>
}
