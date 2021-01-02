FROM openjdk:8
ADD  /service/target/service-0.0.1-SNAPSHOT.jar service-0.0.1-SNAPSHOT.jar
expose 8080
ENTRYPOINT [ "java","-jar","service-0.0.1-SNAPSHOT.jar" ]
