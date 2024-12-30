

<h1 align="center">Node TypeScript Express Template</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Node-22.x.x-%2357A645">
  <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-5.x.x-blue">
  <img alt="Static Badge" src="https://img.shields.io/badge/Express-4.x.x-black">
  <img alt="Static Badge" src="https://img.shields.io/badge/Test-Vitest-yellow">
  <img alt="Static Badge" src="https://img.shields.io/badge/ESLint-4930bd">
</p>


## Description

A template for building scalable and maintainable server-side applications using Node.js, TypeScript, and Express. This template is pre-configured with ESLint for code quality, Vitest for testing, and follows modern development practices.

## Feactures

- Authentication and Authorization with JWT.
- User management module with login, registration, and profile management.
- Role-based access control.

## Previous requirements

**Node version >=22.0.0**

## Installation

1. Clone the repository

```bash
git https://github.com/RamirezPineda/node-ts-express-template.git
```

2. Navigate to the application directory:

```bash
cd node-ts-express-template
```
3. Install the project dependencies:

```bash
npm install
```

## Configuration

Rename the .env.example file to .env and set the environment variables

```bash
# before
|--src
|--tests
|--.env.example
...
...
...
|--vitest.config.mts

# after
|--src
|--tests
|--.env
...
...
...
|--vitest.config.mts
```

## Running the app

```bash
# development
npm run dev

# production
npm run build
npm run start
```

## Test

```bash
# unit tests
npm run test

# test coverage
npm run test:coverage
```

## Linting

To run the linter you can execute:

```bash
npm run lint
```

And for trying to fix lint issues automatically, you can run: 

```bash
npm run lint:fix
```

## Author
Developed and maintained by [RamirezPineda](https://github.com/RamirezPineda).
