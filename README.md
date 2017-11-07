# iDrink
## it2810-webutvikling-h17-prosjekt-4-group-29

In this project we are using the following technologies in a MVC (Model View Controller), client-server architecchture:
- mongoDB
- Node.js
  * Express
  * Mongoose
  * express-session
  * connect-mongo
  * body-parser
- Angular

## Backend

In the backend we have a mongo database with users and sessions stored in a collection. We also have a collection with products from vinmonopolet (https://www.vinmonopolet.no/datadeling).

On the server side we are using Node.js with express.js. We use several of the packages in Node as middleware in our express app. Mongoose is used for database connection, aswell as reading/writing to the database. express-session and connect-mongo is used for session handling, and body-parser is used to retrieve json data in requests/responses to the server. 

## Frontend

We are using angular v4 from www.angular.io as frontend-application. For styling the app will use the css framework bootstrap Sandstone. The app allows the user to browse different products in the database, select their favorites, and save them to their user. 

