# Project werb

werb is a simple, single-page web application designed to help users categorize their ToDo list. 

When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.

## Screenshots
!["Screenshot of enter note page"](https://github.com/...)
!["Screenshot of enter saved notes page"](https://github.com/...)

## Running the project on your local machine

1. Create the `.env` in the project on your machine
2. Update the .env file with your correct local information
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=5432
DB_SSL=true
COOKIE_TOKEN=
API_KEY=
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- aws-sdk 2.0.x or above
- bayes 0.0.7 or above
- body-parser 1.18.x or above
- bootstrap 4.0.0
- cookie-session 2.0.0-beta.3
- dotenv 2.0.0
- ejs 2.5.7
- express 4.16.2
- google-auth-library 1.2.1
- googleapis 25.0.0
- jquery 1.9.1
- knex 0.11.10
- knex-logger 0.1.0
- morgan 1.9.0
- node-sass-middleware 0.9.8
- node-uuid 1.4.8
- pg 6.4.2
- popper.js 1.12.9
- promise 8.0.1
- skeleton 0.1.2
- yelp-fusion 2.0.3
- yelp-fusion-v3 0.0.8