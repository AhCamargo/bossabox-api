## API - VUTTR(Very Useful Tools to Remember) 

- Creating the database(s)

## --- MongoDB
docker run  --name vuttr-mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=alc123 -d mongo:4

- *Interface GUI*
docker run --name vuttr-mongoclient -p 3030:3000 --link vuttr-mongodb:vuttr-mongodb -d mongoclient/mongoclient
  
## create user and create the database in the mongoDB
 docker exec -it vuttr-mongodb \
   mongo --host localhost -u admin -p alc123 --authenticationDatabase admin \
   --eval "db.getSiblingDB('vuttr').createUser({user:'ahcamargo', pwd: 'alc123', roles: [{role: 'readWrite', db: 'vuttr'}]})" 

- Method of Creation
  Utilized Hapi.js for construction of API

## Plus of Application
  * Databases in Docker
  * Framework Hapi.js
  * Designer Pattern used is Repository
    
