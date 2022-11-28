package com.xapphire13.modules

import com.xapphire13.database.*
import com.xapphire13.storage.FileStorage
import com.xapphire13.storage.MockFileStorage
import org.koin.dsl.module

val mockModule = module {
    single<FeatureStore> { MockFeatureStore() }
    single<GroupStore> { MockGroupStore() }
    single<InvitationStore> { MockInvitationStore() }
    single<ChallengeStore> { MockChallengeStore() }
    single<UserStore> { MockUserStore() }
    single<FileStorage> { MockFileStorage() }
    single<UploadStore> { MockUploadStore() }
}
