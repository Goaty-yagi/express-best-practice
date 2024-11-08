# Express Best Practice

## Error Handling

### Purpose
Error handling in an Express application is essential to manage and respond to errors that occur during the execution of your application. Proper error handling ensures that your application can gracefully handle unexpected situations, providing meaningful responses to clients and logging errors for developers to debug and fix issues.

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

