# iDrink
Let's the user browse through products collected from Vinmonopolet, and view details about each product including, but not restricted to how much alchol each product contains per NOK. If the user chooses to register she can mark products as favorites and view her favorites on a my page.


## it2810-webutvikling-h17-prosjekt-4-group-29

In this project we are using the following technologies in a client-server architecture:
- mongoDB
- Node.js
  * expressJS
  * mongoose 
    * mongoose-double
    * mongoose-int32
  * express-session
  * bcryptjs
  * connect-mongo
  * body-parser
- Angular

## How to run locally with external database 
The project makes use of a database hosted at mLab for development so it can be run locally by following the following steps:
1. Install Node & Npm on you computer.
2. Open your terminal
3. Change directory to the folder you want to install the project in
4. Clone this repo using 'git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-29.git'
5. Change directory using 'cd it2810-webutvikling-h17-prosjekt-4-group-29/'
6. Install the packages using 'npm install' 
7. Install @angular/cli globally using 'npm install @angular/cli -g'
8. Write 'node server' in one terminal/cmd  to start express server in root folder of git repo
9. Write 'ng serve' in another termincal/cmd to start angular, execute from root folder of repo
10. Open your browser on localhost:4200 to view the site

# How to test locally with external database
1. Follow steps 1-7 in the "How to run locally with external database"
2. Install Chrome https://www.google.com/chrome
3. Write 'ng test --code-coverage ' in the terminal
4. For code coverage see the coverage folder

## Backend
In the backend we have a Mongo database with users and sessions stored in a collections. We also have a collection with products from vinmonopolet (https://www.vinmonopolet.no/datadeling). Currently the products are imported manually.

On the server side we are using Node.js with Express.js. We use several of the packages in Node as middleware in our express app. The most important packages are:
 - mongoose is used for database connection, as well as reading/writing to the database. 
 - express-session and connect-mongo is used for session handling
 - body-parser is used to retrieve json data in requests/responses to the server. 

## Frontend

We are using Angular v4 from (www.angular.io) as frontend-application. For styling the app will use the css framework Bootstrap Sandstone (https://bootswatch.com/sandstone). 

The components are
- Register User
- Login page
- product list 
  * Filtering 
  * Search
- User page 
  * Word cloud based product categories
  * Favorites
- specific product page
- 404 page not found
- 401 unauthorized
  
Some of the services we will be using are built-in services in Angular, but we will also make some custom services:
  * Validation service (from input fields etc.)
  * Authorization service (related to session handling)
  * Data service (retrival of data from database)
  * Search Service (used to pass data to components)
  
  ## Project Requirements
  How we meet the projects requirements:
  - The application is running on the virtual-machine and can be reached at http://it2810-29.idi.ntnu.no:8084/ when you are connected to NTNU's network.
  - A mongoDB database is also running on the same server and accessed with mongoose
  - The database lets the application write the following documents:
    * User
      * Favorites
    * Session
  - The database lets the application read the following documents:
    * Products 
    * User with authentication
    * Session with authentication
  - Using mongoose we have implemented a search with:
    * Sort
    * Filter
    * Dynamic Loading (Loads 20 documents at a time)
  - The application allows you to view the productdata as a list in the product-list component and a more detailed view with the specific-product component.
  - The application implements my page functionality through the my-page component which allows the user to view her favorite products and favorite product types.
  - The application implements sessions with Session Store-based Session using our mongoDB and express-session and connect-mongo middleware.
  - The application implements "fancy alternative data view" through a word cloud in the my-page component.
  - Testing has been implemented using Jasmine and Karma. 
  - Documentation has hopefully been implimented through this fantastic README.md
  
