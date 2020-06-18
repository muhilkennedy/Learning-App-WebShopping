@echo "####################################################"
@echo "####################################################"
@echo  Compiling Modules
@echo "####################################################"
@echo "####################################################"

:: command to build and compile spring project
call mvn clean install

@echo "####################################################"
@echo "####################################################"
@echo Starting Server
@echo "####################################################"
@echo "####################################################"

::change directory to Spring Module
cd service

::command to run the spring server.
call mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8081"