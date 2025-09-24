# YummiesAngular Frontend

This is a small frontend project developed for a school project, built with Angular 19.
The application connects to a previously created API (from U05 project) and demonstrates a fully functional CRUD interface for managing recipes.
The goal was to create a scalable and maintainable structure that could easily be extended by other developers in the future.

## Features

View all recipes: Browse all recipes stored in the backend.

View single recipe: Click on a recipe to see its details.

Create a recipe: Add a new recipe using a simple form.

Update a recipe: Edit existing recipes in the same form.

Delete a recipe: Remove recipes with a single click.

Responsive design: Works well on both desktop and mobile devices.

## Technical Details

Frontend: Angular 19 with standalone components

Services: RecipeService handles all API requests using RxJS observables

Routing: Router and router-outlet manage navigation between components

Testing: 3 Unit tests written for the RecipeForm Component

Deployment: Hosted on Netlify: https://yummiees.netlify.app

## Installation

Clone the repository:

git clone <https://github.com/SRsoz/yummies-angular.git>


Install dependencies:

npm install


Run the application locally:

ng serve


Open your browser at http://localhost:4200.

## Quick Guide for New Developers

If you want to explore or extend this project:

Start by looking at the components folder. Each feature has its own component.

The RecipeService in core/services handles all communication with the API. You can see how RxJS observables are used for GET, POST, PUT, and DELETE requests.

The router is configured in app.routes.ts to connect components to URLs.