# Node.js microservice project structure proposal

[Docker (and Docker Compose)](https://docs.docker.com/compose/install/) is used to run this example microservice. However there is one limitation: the container's name is hardcoded in *package.json*.

## Running the microservice

- Build the docker containers `docker-compose build`

- Start the docker containers `docker-compose up`

## Linting

- Execute the command `npm run lint` (es6 standard)

- Perhaps we could use something like this for [stricter standards](https://github.com/keithamus/eslint-config-strict/blob/master/es6.js)

## Testing

[Cucumber](https://www.npmjs.com/package/cucumber) is the module used to test.

- To run the tests, execute `docker exec -it <CONTAINER_ID_OR_NAME> npm test` (The container name should be **projectstructureproposal_web_1**, but you can verify with `docker ps`)

## Code coverage

- [Istanbul](https://www.npmjs.com/package/istanbul) is used to calculate the code coverage.

- Run `npm run remote-cover`

## Pre-commit hooks

Used the [pre-commit](https://www.npmjs.com/package/pre-commit) module.

- Linting must pass

- Tests must pass

- Statement coverage >= 90%

## Documentation

[Swagger](http://swagger.io) is used for the documentation. The .yml file is written by hand. The swagger UI interface is served at [http://localhost:5000/docs](http://localhost:5000/docs) path and poiting to the correct .yml file.

### Scripts

> npm run bootstrap

used solely for fulfilling dependencies of the project.

> npm run setup

used to set up a project in an initial state.

> npm run update

used to update the project after a fresh pull.

> npm start

used to start the application.

> npm test

used to run the test suite of the application.

> npm run cibuild

called by the CI server before the tests are run.

### Repo nomenclature proposal

**node-**servicename, ex:

> product api: node-product

> Login / AO: node-login

> Local_Serv (country,currency,language): node-geolocation

> user: node-user

> Cart_Serv: node-cart

> Payment: node-payment

> cryptoserv: node-crypt

> API (white label): node-whitelabel

> Mobile (app): node-mobile

> Gift_Serv: node-giftservice

