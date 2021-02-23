## About the Project

AlbumDB is an album "to-listen" list built with the MERN stack and FusionAuth.

## Getting Started

### Installation

Clone the repository to your local machine and install dependencies using [npm](https://www.npmjs.com/) by running the following commands:

```shell
$ git clone https://github.com/joeycs/albumdb.git
$ cd albumdb
$ npm i
```

### FusionAuth Setup

1. Create a [FusionAuth](https://fusionauth.io/) account

2. Install FusionAuth by running the following commands:

```shell
$ curl -o docker-compose.yml https://raw.githubusercontent.com/FusionAuth/fusionauth-containers/master/docker/fusionauth/docker-compose.yml
$ curl -o .env https://raw.githubusercontent.com/FusionAuth/fusionauth-containers/master/docker/fusionauth/.env
$ docker-compose up
```

3. Open FusionAuth which will now be running at http://localhost:9011

4. Create a new Application

5. Click "Settings" in the left menu

6. Click "API Keys"

7. Click the add button in the top-right

8. Toggle every column in the Endpoints menu

9. Click the save button in the top-right

10. Navigate to `server/.env` in your project directory and replace the `X`s in the `API_KEY` field with the Id of the API key you just created

11. Go to "Applications" and click the edit button next to your Application

12. Enter `http://localhost:5000/oauth-callback` in the `Authorized Redirect URLs` field and `http://localhost:3000` in the `Logout URL` field

13. Click the save button in the top-right

14. Click the view button next to your Application

15. In `server/.env`, replace the `X`s in the `APPLICATION_ID`, `CLIENT_ID`, and `CLIENT_SECRET` fields with your Application's `Id`, `Client Id`, and `Client secret` values respectively

### MongoDB Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

2. Click "New Project" in the top-right to create a new Project

3. Go to "Clusters" and click "Create a New Cluster" in the top-right

4. Under your new Cluster, click "Connect" and then "Connect your application"

5. Ensure "DRIVER" is set to "Node.js" and "VERSION" is set to "3.6 or later"

6. Copy the connection string

7. Navigate to `server/.env` and replace the `X`s in the `ATLAS_URI` field with your connection string

8. In the connection string, replace `<password>` with your MongoDB password and replace `myFirstDatabase` with the name of your project

### Local Deployment

1. Open a new terminal

2. Ensure you are in the project's root directory `albumdb/` and deploy the React app by running the following commands:

```source-shell
$ npm run build
$ serve -l 3000 -s build
```

3. To connect to the MongoDB database, run the following commands:

```source-shell
$ cd server
$ nodemon server
```

4. The project can now be used by visiting http://localhost:3000

## Features in Development

* Generate album art when an album is added to the list
* Generate a Spotify link when an album is added to the list

## Video Demo

[YouTube Link](https://www.youtube.com/watch?v=kHSIckKIGWA)
