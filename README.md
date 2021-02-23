## About the Project

AlbumDB is an album "to-listen" list built with the MERN stack and FusionAuth.

## Getting Started

### Installation

1. Clone the repository to your local machine and install dependencies using [npm](https://www.npmjs.com/) by running the following commands:

```shell
git clone https://github.com/joeycs/albumdb.git
cd albumdb
npm i
```

2. In the project's root directory, create a file called `.env` with the following contents:

```
REACT_APP_SERVER_PORT=5000
```

3. In the project's `server/` directory, create a file called `.env` with the following contents:

```
API_KEY=XXXXXXXX
APPLICATION_ID=XXXXXXXX
ATLAS_URI=XXXXXXXX
CLIENT_ID=XXXXXXXX
CLIENT_PORT=3000
CLIENT_SECRET=XXXXXXXX
FUSION_AUTH_PORT=9011
REDIRECT_URI=http://localhost:5000/oauth-callback
SERVER_PORT=5000
```

### FusionAuth Setup

1. Install [Docker Desktop](https://docker.com/products/docker-desktop) and ensure it is running

2. Create a [FusionAuth](https://fusionauth.io/) account

3. Install and deploy FusionAuth by running the following commands in a new terminal:

```shell
curl -o docker-compose.yml https://raw.githubusercontent.com/FusionAuth/fusionauth-containers/master/docker/fusionauth/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/FusionAuth/fusionauth-containers/master/docker/fusionauth/.env
docker-compose up
```

4. Open FusionAuth which will now be running at http://localhost:9011

5. Create a new Application

6. Click "Settings" in the left menu

7. Click "API Keys"

8. Click the add button in the top-right

9. Toggle every column in the Endpoints menu

10. Click the save button in the top-right

11. Navigate to `server/.env` in your project directory and replace the `X`s in the `API_KEY` field with the Id of the API key you just created

12. Go to "Applications" and click the edit button next to your Application

13. Enter `http://localhost:5000/oauth-callback` in the `Authorized Redirect URLs` field and `http://localhost:3000` in the `Logout URL` field

14. Click the save button in the top-right

15. Click the view button next to your Application

16. In `server/.env`, replace the `X`s in the `APPLICATION_ID`, `CLIENT_ID`, and `CLIENT_SECRET` fields with your Application's `Id`, `Client Id`, and `Client secret` values respectively

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

1. Ensure you are in the project's root directory `albumdb/` and deploy the React app by running the following commands in a new terminal:

```shell
npm run build
serve -l 3000 -s build
```

2. To connect to the MongoDB database, run the following commands in a new terminal:

```shell
cd server
nodemon server
```

3. The project can now be used by visiting http://localhost:3000

## Features in Development

* Generate album art when an album is added to the list
* Generate a Spotify link when an album is added to the list

## Video Demo

[YouTube Link](https://www.youtube.com/watch?v=kHSIckKIGWA)