Waytless is a completed restaurant waitlist management system with menu ordering feature. It is build on MEAN stack and configurated to be deployed on Azure environmment. It supports Google OAuth login with exisitng restaurant owner account. 

## To run server

cd WaytLess\expressNode  
npm run dev

## To run mongo DB

cd WaytLess\expressNode  
mongod -port 27017 -dbpath ".\db"

## To load sample data
cd WaytLess\expressNode\createDB  
mongo  
load('createSampleData.js')

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.
