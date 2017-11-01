# it2810-webutvikling-h17-prosjekt-4-group-29
it2810-webutvikling-h17-prosjekt-4-group-29-1 created by GitHub Classroom


Legg ut dokumentasjon av det planlagte systemet innen 8/11 på GitHub. Beskriv applikasjonen, data, planlagt implementasjon,
valg av løsning etc.  Dette skal brukes for å evaluere/gi tilbakemeldinger på arkitektur og overordent design. 
Det er deltagelse i denne evalueringen som teller.  Evaluering av arkitektur og design av systemet gjøres 9/11 
(det er deltagelse i evalueringen som teller og i sluttevalueringen blir det sjekket om dere følger relevante råd).


In this project we are using the following technologies:
- mongoDB
- Node.js
  * Express
  * Mongoose
  * express-session
  * connect-mongo
  * body-parser
- Angular

We are using MVC (Model View Controller) in a client-server architecchture. 

## Backend

In the backend we have a mongo database with users and sessions stored in a collection. We also have a collection with products from vinmonopolet (https://www.vinmonopolet.no/datadeling).

On the server side we are using Node.js with express.js. We use several of the packages in Node as middleware in our express app. Mongoose is used for database connection, aswell as reading/writing to the database. express-session and connect-mongo is used for session handling, and body-parser is used to retrieve json data in requests/responses to the server. 

## Frontend

We are using angular v4 from www.angular.io as frontend-application. Internally in the frontend application its utilizes the MVC- architecture aswell as internal routing. 



