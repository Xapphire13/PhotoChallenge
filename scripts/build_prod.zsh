pushd web
npm run build:prod
popd

pushd server
./gradlew shadowJar
popd