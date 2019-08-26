# api

Shareable JWT API Authentication service for NestJS Applications

## Usage

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

