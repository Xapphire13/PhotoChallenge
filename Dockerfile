FROM eclipse-temurin:11
RUN mkdir /opt/app
COPY server/build/libs/com.xapphire13.photo-challenge-server-0.0.1-all.jar /opt/app
COPY web/dist /opt/app/dist
CMD ["java", "-jar", "/opt/app/com.xapphire13.photo-challenge-server-0.0.1-all.jar"]