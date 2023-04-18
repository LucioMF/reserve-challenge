## Getting Started
To get you started you can simply clone the repository:

```
git clone https://github.com/LucioMF/reserve-challenge
```
and install the dependencies
```
npm install
```

### Prerequisites
You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from  [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

#### MongoDB
The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.

### Start the MongoDB server
First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.

### Run the Application
The project is preconfigured with a simple development web server. The simplest way to start this server is:

    npm start

### Testing
To run the application tests run:

    npm run test

#### Alternative setup with Docker
Alternatively you can install docker[https://www.docker.com/](https://www.docker.com/) with its docker-compose tool and use it to deploy both the database and the nodejs server

## If you want to cheange either the PORT in wich will run the nodejs server or the database URI, create an .env file with the following environment variables
PORT=3030
MONGODB_URI=mongodb://user:password@localhost:27017/reserve
# To do the same for the docker setup you will have to change the environment and ports section on the "noder-server" service within the docker-compose.yml file
..........
    ports:
      - "3031:3031"
    environment:
      WAIT_HOSTS: mongodb:27017
      MONGODB_URI: mongodb://user:password@mongodb:27017/reserve
      HOST: "0.0.0.0"
      PORT: 3031
..........

## Run the following command to create and run the application and database containers
docker-compose up -d
