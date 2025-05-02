# RecipeFinder

## tools and libraries used
- Nodejs 20.11.1
- Angular CLI 19.2.9
- RxJs 7.8
- NgRx Signal 19.1
- Material 19.2
- Jasmine 5.1
- Karma 6.4
- Cypress 14

# Installation

Once downloaded the Github repo run:
```bash
npm install -g @angular/cli@19.2.9
npm i
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.



## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

To execute e2e test with the [Cypress](https://www.cypress.io/) test runner, use the 

```bash
ng serve
npx cypress open
```


## Additional assumptions

- A mock server is not provided, so an internet connection is required to run the application, even in development mode.
- The API URL is specified in the environment variables and can be replaced in the environment.ts file if necessary.
- All tests use mock JSON data, so an internet connection is not required to run unit tests and end-to-end (E2E) tests.
- Given that the APIs are exclusively available in English, implementing localization in the application was deemed unnecessary.
- To speed up the UI implementation, some Angular Material components were used, with style overrides applied to achieve the final result.
- Considering that the available API resources are limited and the response times are fast, an autocomplete search has been implemented to enhance the user experience.
- Session storage is used as a caching mechanism to improve performance during navigation, while local storage is used to persist user preferences (favorite recipes).
- Access to the list of favorite recipes is dependent on adding at least one recipe to the favorites list. Until at least one recipe is added to the favorites, the button to access the dedicated page is not displayed.
- The state manager is implemented using ngrx/signal to fully leverage the performance of Angular's signal concept. To avoid unnecessarily increasing the complexity of the code, a canonical Redux pattern has not been implemented; instead, a mix of Reducers (with Observable) and asynchronous calls (with Promise) has been used based on development needs.
- Components are divided into stateless (UI components) and stateful ones (extending the StatefulComponent class). The goal is to clearly separate dumb and smart components to simplify testing and maintenance.
- Every text-based search from the user is subject to sanitization to prevent malicious use.
- Given that API calls are limited, I chose not to use an HTTP client with an interceptor to handle exceptions, but instead to use fetch requests and try-catch blocks to intercept and propagate any HTTP errors through the application state.
- To decouple the APIs from the business logic of the application, API models are mapped to application models. Only the API service is aware of the API implementation.
- Test coverage is not complete; only some of the most significant tests in terms of functionality and security have been implemented.