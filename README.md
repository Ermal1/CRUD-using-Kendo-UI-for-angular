# CRUD Application for Managing Users

This project is a simple CRUD (Create, Read, Update, Delete) application for managing users. The application uses **Angular 16+**, **Kendo UI for Angular**, **Bootstrap**, and **HTML/CSS** for the frontend, and **JSON Server** as the mock backend to store data in local JSON files.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete users.
- **Role-based Access Control**: Users are assigned roles, and access is restricted based on the role.
- **JWT Authentication**: Secure user login and role management.
- **Route Guards**: Ensure only authorized users can access certain routes.

## Technologies Used

- **Frontend**: Angular 16+, Kendo UI for Angular, Bootstrap, HTML, CSS
- **Backend**: JSON Server (local mock backend)
- **Authentication**: JWT
- **Authorization**: Role-based access control using enums
- **Routing**: Angular route guards

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ermal1/CRUD-using-Kendo-UI-for-angular.git
   ```

## Install dependencies

Navigate to the project directory and install the necessary dependencies:

npm install

## Run application:

npm start

Applicaton runs conccurrently as it is defined in package.json file:

`"start": "concurrently \"ng serve\" \"json-server --watch users.json --port 3000\"" `

## Kendo UI License

This project uses Kendo UI for Angular. A trial license has been enrolled, and the license file is saved as kendo-ui-license.txt in the project directory.

## API Endpoints

The application interacts with the following JSON Server API endpoints:

GET /users: Fetch all users.
POST /users: Create a new user.
PUT /users/:id: Update an existing user.
DELETE /users/:id: Delete a user.

## JWT Authentication

The application uses JWT for authentication. To simulate user login, the login() method in the authentication service generates a token upon valid user credentials. This token is stored in local storage and is used for subsequent API requests.

## Project Structure

src/
│
├── app/
│ ├── components/
│ ├── guards/
│ ├── models/
│ ├── services/
│ └── app.module.ts
│
├── assets/
├── enum/
├── styles.css
└── index.html
