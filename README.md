# iDrink
An alcohol per NOK calculator and Vinmonopolet product browser.

## it2810-webutvikling-h17-prosjekt-4-group-29

In this project we are using the following technologies in a MVC (Model View Controller), client-server architecture:
- mongoDB
- Node.js
  * Express
  * Mongoose
  * express-session
  * connect-mongo
  * body-parser
- Angular

## Backend

In the backend we have a mongo database with users and sessions stored in a collection. We also have a collection with products from vinmonopolet (https://www.vinmonopolet.no/datadeling). We are currently doing the imports manually.

On the server side we are using Node.js with express.js. We use several of the packages in Node as middleware in our express app. Mongoose is used for database connection, as well as reading/writing to the database. express-session and connect-mongo is used for session handling, and body-parser is used to retrieve json data in requests/responses to the server. 

## Frontend

We are using angular v4 from (www.angular.io) as frontend-application. For styling the app will use the css framework bootstrap Sandstone (https://bootswatch.com/sandstone). 

The main components will be 
- Register User
- Login page
- product list 
  * Filtering 
  * Search
  * Word cloud based product categories
- User page 
  * Favorites
  
Some of the services we will be using are built-in services in Angular, but we will also make some custom services:
  * Validation service (from input fields etc.)
  * Authorization service (related to session handling)
  * Data service (retrival of data from database)

For the authorization part, we have also made a diagram to illustrate how it works,[You can see here](https://1drv.ms/i/s!AqjtP2lzmVt9j7hH3qjDt3_AWXSMKQ)