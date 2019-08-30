<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Pluggable JWT API Authentication Module for NestJS Applications
</p>

<p align="center">
  <a href="https://www.npmjs.com/~polyrithm"><img src="https://img.shields.io/npm/v/@polyrithm/api-auth.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~polyrithm"><img src="https://img.shields.io/npm/l/@polyrithm/api-auth.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~polyrithm"><img src="https://img.shields.io/npm/dm/@polyrithm/api-auth.svg" alt="NPM Downloads" /></a>
</p>

## Installation

This module has peer dependencies of `@nestjs/common, @nestjs/core, @nestjs/typeorm` so make sure you have these packages installed before attempting to user `@polyrithm/api-auth`

```bash
npm install --save @polyrithm/api-auth
```

or

```bash
yarn add @polyrithm/api-auth
```

## Usage

- Import the AuthModule into the root AppModule
- Set the secret and expiry
- Add User Entity from @polyrithm/api-auth to `Entities` array in typeorm configuration

```ts
//app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@polyrithm/api-auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@polyrithm/api-auth';
import { environment } from '../environments/environment';

@Module({
  imports: [
    AuthModule.forRoot({expiresIn: 3600, secret: environment.jwt_secret}),
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "username",
        "password": "password",
        "database": "database",
        "entities": [

          User // Add User Entity from @polyrithm/api-auth
        ],
        "synchronize": true,
        "connectTimeout": 5000
      }

    )
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})

export class AppModule {}

```

## Guarded Routes

By default all routes are guarded. We prefer using an inversion principle and make controllers or handlers public explicitly by using the @Public() decorator on
the controller or handlers which expose public routes

```ts

// app.controller.ts
import { Controller, Get } from '@nestjs/common';

import { Message } from '@hippopdf/shared';

import { AppService } from './app.service';
import { Public } from '@polyrithm/api-auth';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('example-guarded-route')
  sayHello(): Message {

  }

}


```

## Available Auth Endpoints

**Register**

----
  Register a new user

* **URL**

  /auth/register

* **Method:**

  `POST`

* **Data Params**

  * **Schema:** AuthCredentials

    **Payload:**

    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": [
          {
              "target": {
                  "email": "",
                  "password": ""
              },
              "value": "",
              "property": "email",
              "children": [],
              "constraints": {
                  "isEmail": "email must be an email",
                  "isNotEmpty": "email should not be empty"
              }
          },
          {
              "target": {
                  "email": "",
                  "password": ""
              },
              "value": "",
              "property": "password",
              "children": [],
              "constraints": {
                  "matches": "The string must contain at least 1 numeric character",
                  "minLength": "password must be longer than or equal to 8 characters",
                  "isNotEmpty": "password should not be empty"
              }
          }
        ]
      }
    ```
<!--
* **Notes:** -->

**Login**
----
  Login user

* **URL**

  /auth/login

* **Method:**

  `POST`

* **Data Params**

  * **Schema:** AuthCredentials

    **Payload:**

    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
  * **Body**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTU2NjgxMjQ0MCwiZXhwIjoxNTY2ODE2MDQwfQ.tXThbN6ZXT9TknTKM4TRiJ45Xq5bzPP8MECemrsew2k"
  }
  ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    ```json
    {
      "statusCode": 401,
      "error": "Unauthorized",
      "message": "Invalid Credentials"
    }
    ```

<!-- * **Notes:** -->

