# Angular 2 Universal with Hapi
This project was generated with [universal-cli](https://github.com/devCrossNet/angular-cli) version 1.0.0-alpha.universal.2-2.

## What is the difference with the express server?
By default, Angular Universal uses express as node server. However, it is possible to use any other server like Hapi. By the way, the Angular Universal team provides views engines for both express and hapi.

The two main differences between the hapi and the express implementations consist in:
- the hapi dependencies installed in the [package.json](https://github.com/Boulangerie/angular2-universal-hapi/blob/master/package.json) and which replace the express deps
- the [server.ts](https://github.com/Boulangerie/angular2-universal-hapi/blob/master/src/server.ts) which initializes the hapi server instead of the express one

The project uses a copy of the [hapi-engine](https://github.com/Boulangerie/angular2-universal-hapi/blob/master/src/app/hapi-engine.ts) made by [bisubus](https://github.com/bisubus). It will be updated to use the official [angular2-hapi-engine](https://www.npmjs.com/package/angular2-hapi-engine) once this [pull request](https://github.com/angular/universal/pull/599) is merged.

## Quick start
```sh
npm i -g universal-cli
npm i
```

## Development server
Run `ung serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ung generate component component-name` to generate a new component. You can also use `ung generate directive/pipe/service/class`.

## Build

Run `ung build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ung test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ung e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ung serve`.

## Deploying to Github Pages

Run `ung github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ung --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
