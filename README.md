## `Simple Stocks Wallet Application`

This is a simple application used to apply knowledge and techniques learned about Full-Stack Web development.  
This application simulates a Stocks Wallet where you can search and store assets locally. 
It fetches data from the Alpha Vantage Web API.  
The UI displays a search bar and a grid of cards with the asset's information.

## Frameworks and Dependencies Used

- Backend
  - Apollo GraphQL
  - Mongo DB

- Frontend
  - Next.JS
  - React
  - Tailwind

- Language
  - Typescript

- Dependencies
  - Docker Compose

## Features

- An asset should be stored when the user press enter with a keyword in the search bar;
- An asset should not be stored multiple times;
- Only assets from Brazil and USA should be stored;
- The number of shares must be between 0 ~ 100;
- The asset card have an input to change the number of shares;

#### Running the Application

This project uses `docker-compose` to run all the environments needed. In the root folder, simply run the following command:

```SH
$ docker-compose up
```
