# Announcement Bot Dashboard (API)

- [Link to Frontend repository](https://github.com/bubbzDotDev/bot-dashboard)
- [Link to Bot repository](https://github.com/bubbzDotDev/bot-dashboard-bot)

## Installation

```bash
$ npm install
```
## Configure .env file
```bash
# Server Settings
PORT=
(Locally, it will be 3001)

# Session/Cookie Settings
COOKIE_SECRET=

# Discord App Credentials
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URL=
(Locally, it will be http://localhost:3001/api/auth/redirect)
DISCORD_BOT_TOKEN=

# MySQL Server Settings
MYSQL_DB_HOST=
MYSQL_DB_PORT=
MYSQL_DB_USERNAME=
MYSQL_DB_PASSWORD=
MYSQL_DB_DATABASE=
MYSQL_DB_SYNCHRONIZE=  #true in development; false in production

# Frontend
BOT_FRONTEND_HOST=
(Locally, it will be http://localhost:5173)

#Encryption
PASSWORD=
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Special Thanks
[Anson The Developer](https://www.youtube.com/c/AnsontheDeveloper): 
Anson's [2022 Discord Bot Dashboard Tutorial](https://youtube.com/playlist?list=PL_cUvD4qzbkyX4Wp8TAfjpttjUldDWJnp) got this project off the ground.
