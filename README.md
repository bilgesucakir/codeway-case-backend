# Codeway Case Backend — Node.js REST API with Firebase

A full-featured REST API built with **Node.js**, **Express**, and **Firebase** for user authentication and configuration management.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- Firebase project credentials (admin + client SDK)

## Features

- Firebase Authentication (sign up, sign in, password reset, password change, sign out)
- Configuration management (create, update, delete, list)
- Protected routes with token-based auth
- Firebase Admin SDK integration (Firestore, Auth)
- Environment-based configuration using `.env`

## Installation

1. Clone the repository
```bash
git clone https://github.com/bilgesucakir/codeway-case.git
cd codeway-case/codeway-case-backend
```
2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the codeway-case-backend directory with the following variables:
```
PORT=3000
NODE_ENV=development

FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-firebase-client-id
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Authentication Endpoints
### `POST /auth/signup` Sign up a new user

**Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword123",
    "displayName": "John Doe"
  }
```
**Success Response:**
- Status: 201 Created
- Body:

```json
{
    "message": "User created successfully",
    "user": {
        "uid": "DzD4OqdabQdFZ6a5XTP0FNagdxt2",
        "email": "user@example.com",
        "displayName": "John Doe",
        "role": "user",
        "createdAt": "2025-06-03T10:01:20.245Z",
        "lastLoginAt": "2025-06-03T10:01:20.245Z"
    },
    "token": "token"
}
```
**Error Response:**
- Status: 400 Bad Request
- Body:

```json
{ "message": "User creation failed" }
```




### `POST /auth/signin` Sign in with credentials

**Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword123",
  }
```
**Success Response:**
- Status: 200 OK
- Body:

```json
{
    "message": "Sign in successful",
    "user": {
        "uid": "DzD4OqdabQdFZ6a5XTP0FNagdxt2",
        "email": "user@example.com",
        "displayName": "John Doe",
        "role": "user",
        "createdAt": {
            "_seconds": 1748944880,
            "_nanoseconds": 245000000
        },
        "lastLoginAt": {
            "_seconds": 1748945047,
            "_nanoseconds": 984000000
        }
    },
    "token": "token"
}
```
**Error Response:**
- Status: 401 Unauthorized
- Body:

```json
{
    "message": "Sign in successful"
}
```



### `POST /auth/reset-password` Reset user password

**Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
```
**Success Response:**
- Status: 200 OK
- Body:

```json
{
    "message": "Password reset email sent"
}
```
**Error Response:**
- Status: 400 Bad Request
- Body:
```json
{
    "message": "Password reset failed"
}
```


### `POST /auth/update-password` Update user password (token needed)

**Request Body:**
  ```json
  {
    "password": "newPassword"
  }
```

**Success Response:**
- Status: 200 OK
- Body:

```json
{
    "message": "Password updated successfully"
}
```
**Error Response:**
- Status: 400 Bad Request
- Body:
```json
{
    "message": "Password update failed"
}
```



### `POST /auth/signout` Sign out (token needed)

**Success Response:**
- Status: 200 OK
- Body:
```json
{
    "message": "Sign out successful"
}
```
- Status: 400 Bad Request
- Body:

```json
{
    "message": "Sign out failed"
}
```




## Configuration Endpoints (Protected)
### `GET /`: Welcome message

**Success Response:**
- Status: 200 OK
- Body:
```json
{
    "message": "Welcome to the REST API"
}
```





### `GET /api/configurations`: Get all configurations
**Success Response:**
- Status: 200 OK
- Body:
```json
[
  {
    "id": "bHkvZMtLMfSaWauDobzv",
    "parameterKey": "new_param",
    "value": "1",
    "description": "New parameter",
    "createdAt": {
        "_seconds": 1748945758,
        "_nanoseconds": 534000000
    }
  },
  {
    "id": "bHkvZMtLMfSaWauDobzc",
    "parameterKey": "new_param_2",
    "value": "1.2",
    "description": "New parameter 2",
    "createdAt": {
        "_seconds": 1748945759,
        "_nanoseconds": 534000000
    }
  }
]
```
**Error Response:**
- Status: 500 Internal Server Error
- Body:

```json
{
    "message": "Error getting configurations"
}
```



### `GET /api/configurations/:id`: Get a specific configuration

**Success Response:**
- Status: 200 OK
- Body:
```json
{
    "id": "bHkvZMtLMfSaWauDobzv",
    "parameterKey": "new_param",
    "value": "1",
    "description": "New parameter",
    "createdAt": {
        "_seconds": 1748945758,
        "_nanoseconds": 534000000
    }
}
```
**Error Response:**
- Status: 404 Not Found
- Body:

```json
{
    "message": "Configuration not found"
}
```
- Status: 500 Internal Server Error
- Body:

```json
{
    "message": "Error getting configuration"
}
```





### `POST /api/configurations`: Create a new configuration

**Request Body:**
  ```json
  {
      "parameterKey": "new_param", 
      "value": "1", 
      "description": "New parameter"
  }
```
**Success Response:**
- Status: 201 Created
- Body:
```json
{
    "id": "bHkvZMtLMfSaWauDobzv",
    "parameterKey": "new_param",
    "value": "1",
    "description": "New parameter",
    "createdAt": {
        "_seconds": 1748945758,
        "_nanoseconds": 534000000
    }
}
```
**Error Response:**
- Status: 500 Internal Server Error
- Body:

```json
{
    "message": "Error creating configuration"
}
```





### `PUT /api/configurations/:id`: Update a specific configuration

**Request Body:**
  ```json
  {
      "parameterKey": "my_param", 
      "value": "3", 
      "description": "Updated description"
  }
```
**Success Response:**
- Status: 200 OK
- Body:
```json
{
    "id": "OETwcYzKhM88dNi5pO3O",
    "parameterKey": "my_param",
    "value": "3",
    "description": "Updated description",
    "createdAt": {
        "_seconds": 1748945583,
        "_nanoseconds": 614000000
    }
}
```
**Error Response:**
- Status: 404 Not Found
- Body:

```json
{
    "message": "Configuration not found"
}
```
- Status: 500 Internal Server Error
- Body:

```json
{
    "message": "Error updating configuration"
}
```


### `DELETE /api/configurations/:id`: Delete a specific configuration

**Success Response:**
- Status: 204 No Content

**Error Response:**
- Status: 404 Not Found
- Body:

```json
{
    "message": "Configuration not found"
}
```
- Status: 500 Internal Server Error
- Body:

```json
{
    "message": "Error deleting configuration"
}
```



## Project Structure

```
src/
├── config/         # Firebase admin & client initialization
├── controllers/    # Route controllers
├── dtos/           # DTOs for API shape
├── middleware/     # Auth middleware for route protection
├── models/         # Data Models (User, Configuration)
├── routes/         # All application routes
├── services/       # Business logic layer
└── index.js        # Application entry point
.env                # Environment variables
.gitignore          # Specifies files and folders to be ignored by Git
package-lock.json   # v
package.json        # Contains project metadata, scripts, and lists dependencies
README.md           # Project description
``` 