# Express Best Practice

## Error Handling

### Purpose

Error handling in an Express application is essential to manage and respond to errors that occur during the execution of your application. Proper error handling ensures that your application can gracefully handle unexpected situations, providing meaningful responses to clients and logging errors for developers to debug and fix issues.

### Location

The validation middleware is defined in the `middlewares/errorHandler.ts/errorHandler` file. The Joi schema used for validation is also defined and exported from the same file.

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

## Environment Variables

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