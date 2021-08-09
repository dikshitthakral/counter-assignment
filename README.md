# Backend-Counter - POC

GETIR-Assignment POC

## Purpose

The current PoC project aims to develop a working node backend based on a given set of business conditions
This service caters fetching counters based on criteria.

## IDE recommendations and setup

- VSCode IDE

## Dev setup

- Install all the dependencies using `npm install`
- To build the application for latest changes `npm run build`
- To do lint `npm run lint`
- To build and run the server with watch use `npm run start`
- To run unit test cases `npm run test`

## Unit Testing
- Unit Test: We are using Jest for unit testing.

### Optional

- Default we are using console log we can change into Winstonlogger

## Build With

- Node - The runtime server framework used
- ExpressJS - minimalist web framework for Node.js
- Mongodb - Backend Database used
- Mongoose - to model your application data with Mongodb

## Development

Default port is 5000.

There are 2 API end points :

I have added a postman collection name : getir.postman_collection.json Please use this 
to verify counter criteria.


## Docker Push registry steps

- Docker build
  ```
  docker build -t assessment/getir .
  ```
- Docker run command
  ```
  docker run --name getir -p 5000:5000 getir --env MONGO_URL=localhost --env PORT=5000
  ```
- Upload The Image To Docker Registry Docker Hub
  ```
  docker tag getir getir
  docker push getir:1.1
  ```
  If you're using VSCode as your IDE, simply hit F5 to run the service. While the service is running, you can use swagger,
  Postman, or curl to exercise the API.