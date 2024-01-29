## Create server

1) `npm i -g typeorm`
2) `typeorm init --name server --database postgres` || `typeorm init --name server --database sqlite`

## Setup server

1) `cd server`
2) `npx tsconfig.json` (node)
3) `yarn` or `npm i`
4) `yarn upgrade-interactive --latest` or `npm update --save`
5) Configure ormconfig.json
5) Create database: `createdb jwt-auth-example` or manually
6) `npm start`
7) `npm i express apollo-server-express graphql`
8) `npm i -D @types/express @types/graphql`
9) `npm i type-graphql`
10) `npm i bcryptjs`
11) `npm i -D @types/bcryptjs`