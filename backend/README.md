# Backend Readme


## Development Environment

### Database:
Connections to the database from the backend are managed by Prism. Before the server runs,
Prism will check the environment for `DATABASE_URL` for the url of the database. If the variable is unset, Prism will
execute `backend/.env` to attempt to set it. Point this variable at a local test database. Do **not** set this to the production database. We are going to create a local database for development.

On your development machine create a database/schema using mysql, and create a user with permissions to create databases:
```sql
CREATE USER 'prisma'@'localhost' IDENTIFIED BY 'some_password';
CREATE SCHEMA icpcdev;
GRANT ALL PRIVILEGES ON icpcdev.* TO 'prisma'@'localhost';
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* to 'prisma'@'localhost';
```


Here is a template for your `.env`:
```sh
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

HOST=localhost
USER=prisma     # Name of user, must have GRANT CREATE, ALTER, DROP, REFERENCES ON *.*
PASS=some_password
DBNAME=  # Name of your database
PORT=

DATABASE_URL="mysql://${USER}:${PASS}@${HOST}:${PORT}/${DBNAME}"
```

To init your database for the first time run:
```bash
npx prisma migrate reset
```

// TODO: Talk about `migrate dev` for schema updates

(Optional) Prisma includes a webapp to view/modify entries in your test database. To run it:
```sh
npx prisma studio # opens a webapp in your browser
```

### Running the server:

Once the database is set up, you can build and run the server. In order to run the backend locally on your development computer, run the following:
```sh
cd backend
# install dependencies and type definitions locally
npm install
# build the backend. source files in `backend/src` build to `backend/dist`
npm run build
# runs server
npm run start
```

## Architecture
TODO