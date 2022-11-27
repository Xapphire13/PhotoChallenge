pushd web
npm run build:dev
popd

pushd server
./gradlew shadowJar
popd