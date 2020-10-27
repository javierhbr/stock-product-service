## Run

### 1 - Run docker compose for :

- adichallenge:product-engine
- Mongo DB

From root folder of the project:
`docker-compose up --build`

##### Load Data To MongoDB

Execute ``./mongo-seed/import.sh``

### 2 - Run Node application

From root folder of the project:

`npm install`

`npm start`


### Run with PM2
Install pm2 

` sudo npm install -g pm2`

Run pm2

`pm2 start ecosystem.config.js`

See logs `pm2 logs`

Stop pm2

`pm2 stop ecosystem.config.js`


### Usage:

use the rest calls inside `challenge.rest` file

Or use swagger docs http://localhost:3001/api-docs/

Product ID to test with:
 - 100
 - 200
 - 300
 - 400
 - 500
 - 600
 - 700
 - 800
 