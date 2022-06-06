This is a small and simple project built as a challenge for the mid-level fullstack developer role at Launchcode.

The project consists of 2 layers:
A frontend, written in Typescript React using Vite as a module bundler and pnpm as a package manager and some notable libraries, such as but not limited to:
- React Query - for the API requests
- Chakra UI as the component library
- react-icons - because icons are cool
- axios - to fetch data from the backend
- lorem-ipsum - to generate lorem ipsum text as a placeholder
- As well as prettier and eslint to help on the development

The backend:
- Written in Typescript using NestJS and the PrismaORM that's connected to a SQLite database for the sake of simplicity
- It has a seeding script that generates fake data and inserts in into the database using the FakerJS library

API Endpoints:
- GET /quotes - get a list of all quotes
- GET /quotes/:id - get a unique quote
- POST /quotes - create a new quote
- PATCH /quotes/:id - edit an existing quote
- DELETE /quotes/:id  - delete and existing quote

This  repository is divided in two main folders: backend and frontend.
The instructions on how to install all the dependencies and start the respective projects are on its respective folders.
