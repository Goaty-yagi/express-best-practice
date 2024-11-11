# Express Best Practice

##  Directory Structure
```bash

/project-root
│
├── /src                      # Source files for the application 
│   ├── /config               # Configuration files
│   ├── /controllers          # Controllers for handling requests
│   ├── /loaders              # Centralized logic to load services
│   ├── /middlewares          # Custom middleware (e.g., validation, JWT authentication)
│   ├── /models               # Database models and schemas
│   ├── /routes               # Express route definitions
│   ├── /services             # Business logic or service layer
│   ├── /utils                # Utility functions or helpers
│   ├── /types                # TypeScript types and interfaces
│   ├── /app.ts               # Main application setup
│
├── /docs                     # API documentation, including Swagger YAML/JSON
│   └── api-docs.yaml         # Swagger/OpenAPI spec file
├── /node_modules
├── /public
├── /tests
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

```

## 404 Error Handling
This middleware is used to catch any requests that do not match an existing route in the Express application. When a request is made to a route that isn't defined, this middleware creates an error with the message "Not Found", sets the HTTP status code to 404, and passes the error to the next middleware using next(err).

### Location
The middleware is defined in the `loaders/index.ts` file. 


## Error Handling

### Purpose

Error handling in an Express application is essential to manage and respond to errors that occur during the execution of your application. Proper error handling ensures that your application can gracefully handle unexpected situations, providing meaningful responses to clients and logging errors for developers to debug and fix issues.

### Location

This middleware is defined in the `middlewares/errorHandler.ts/errorHandler` file. The Joi schema used for validation is also defined and exported from the same file.

### Where to Locate

In an Express application, error handling middleware should be located after all other `app.use()` and route calls, but before the `app.listen()` call. This ensures that it can catch errors from all parts of the application, including middleware and route handlers.

Typically, you would organize your error handling in a dedicated middleware file, such as `middlewares/errorHandler.js`, and then import and use it in your main application file (e.g., `app.js` or `server.js`).

### Functionality

An error handling middleware in Express captures any error passed to the `next` function and formats an appropriate response. It typically includes the following functionalities:

- **Logging the Error:** Log the error details to the console or a logging service for debugging.
- **Setting the Status Code:** Set the HTTP status code of the response. If no status code is set, it defaults to 500 (Internal Server Error).
- **Sending the Response:** Send a JSON response containing the error message and, in non-production environments, the error stack trace.

### Example response

```javascript
 {
  "message": "Something went wrong!",
  "stack": "Error: Something went wrong!\n    at /path/to/project/app.js:XX:XX\n    at Layer.handle [as handle_request] (/path/to/project/node_modules/express/lib/router/layer.js:95:5)\n    at next (/path/to/project/node_modules/express/lib/router/route.js:137:13)\n    at Route.dispatch (/path/to/project/node_modules/express/lib/router/route.js:112:3)\n    at Layer.handle [as handle_request] (/path/to/project/node_modules/express/lib/router/layer.js:95:5)\n    at /path/to/project/node_modules/express/lib/router/index.js:281:22\n    at Function.process_params (/path/to/project/node_modules/express/lib/router/index.js:335:12)\n    at next (/path/to/project/node_modules/express/lib/router/index.js:275:10)\n    at /path/to/project/app.js:XX:XX\n    at Layer.handle [as handle_request] (/path/to/project/node_modules/express/lib/router/layer.js:95:5)"
}
```

### 
## Validation

### Purpose

The validation middleware ensures that incoming requests to your Express.js application meet the specified schema requirements. It uses Joi, a powerful schema description language and data validator for JavaScript, to validate the request body and provide clear error messages if the validation fails. This helps maintain the integrity and consistency of the data your application processes.

### Location

The validation middleware is defined in the `middlewares/validation.ts/requestValidater` file. The Joi schema used for validation is also defined and exported from the same file.

### Functionality

- **Validation**: The middleware takes a Joi schema as an argument and validates the incoming request's body against this schema.
- **Error Handling**: If the validation fails, it returns a 400 status code with a JSON response containing the validation error message.
- **Sanitization**: If the validation succeeds, it replaces the original request body with the validated and sanitized data.
- **Next Middleware**: After validation and sanitization, the middleware calls `next()` to pass control to the next middleware or route handler.

### Example response

```javascript
{
    "error": "\"email\" is required"
}
```
## Environment variables

### Purpose
Environment variables are used to manage configuration settings and sensitive information such as API keys, database credentials, and other settings that your application needs to function correctly. This approach allows you to keep these details secure and separate from your codebase.

### Setup

#### Step 1: Install `dotenv`
First, you need to install the `dotenv` package if you haven't already:

```bash
npm install dotenv
```

#### Step 2: Create a .env file in the root directory of your project. This file will contain all your environment variables.

```
# .env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret
```

#### Step 3: Load Environment Variables

In your main application file (e.g., app.js or index.js), use the dotenv package to load the environment variables from the .env file. This is done by adding the following code at the top of your file:

```javascript
import { config } from "dotenv";
config();

or 

import 'dotenv/config';
```

#### Step 4: Access Environment Variables
You can now access the environment variables using process.env.

```javascript
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

#### Step 5: Add .env to .gitignore

To ensure that your environment variables are not exposed to version control, add the .env file to your .gitignore file:
```
# .gitignore

.env
```

## Security

To enhance the security of your Express application, it is important to configure proper middleware. Two commonly used middleware packages for this purpose are `cors`, `helmet` and `express-rate-limit`.

### Reference
[express documentation](https://expressjs.com/en/advanced/best-practice-security.html)

### CORS (Cross-Origin Resource Sharing)

CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. This is useful for enabling your API to be accessed by different front-end applications hosted on different domains.

You can implement cors using the `cors` package.

#### Info
https://www.npmjs.com/package/cors

### Helmet

Helmet helps secure your Express application by setting various HTTP headers. It can help protect your app from some well-known web vulnerabilities by configuring HTTP headers appropriately.

You can implement Helmet using the `helmet` package.

#### Info
https://helmetjs.github.io/

### Rate Limiting

Rate limiting restricts the number of requests a user can make to your API in a certain period of time. This helps mitigate abuse from brute-force attacks, DoS (Denial of Service) attacks, and ensures fair usage of resources.

You can implement rate limiting using the `express-rate-limit` package.

#### Info
https://www.npmjs.com/package/express-rate-limit


### Vulnerability
`npm audit` is a built-in command in npm that helps developers identify and address vulnerabilities in their project dependencies. This command scans the node_modules directory for known security issues in the installed packages and reports any vulnerabilities found. It leverages the public npm registry's vulnerability database, which is regularly updated with the latest security advisories.


## Logger
This application uses Winston for logging, providing flexible logging to both the console and a log file. The logger is configured to work in various environments (e.g., development, production) with different log formats and transports.

### Location

The loggeris defined in the `loaders/logger.ts` file. 

### Example 

```javascript

import Logger from '../loaders/logger';

Logger.info(`Server listening on port: ${config.port}`);
```

## Configuration

To manage all your security and application settings in one place, it's a good practice to use a configuration file. This allows you to update your settings centrally and apply them easily in your application.

### Location

The configration file is defined in the `src/config/index.ts` file. 



## Swagger API Documentation

### Steps to Use Swagger Editor:
Swagger/OpenAI is a framework for designing, building, and documenting RESTful APIs. It provides a standardized format (usually in YAML or JSON) to describe API endpoints, request parameters, responses, and other details, making it easier for developers to create, test, and maintain APIs.

#### 1. Open Swagger Editor
- Go to (Swagger Editor)[https://editor.swagger.io/].

#### 2. Load the API Documentation
- Copy the API documentation `docs/api-docs.yaml` and paste it into the Swagger Editor.

### 3. Explore and Test the API:
- Once the documentation is loaded in Swagger Editor, you will see the /register and /login endpoints.
