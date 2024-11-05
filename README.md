# Royal Student Project

## Overview
The Royal Student Project is a Spring Boot application that leverages Hibernate for database management. It implements features such as user authentication, role-based access control, and CRUD operations for managing student data. The application also includes RESTful APIs, JWT token authentication, and Swagger documentation.

## Technologies Used
- **Spring Boot**: Framework for building the application.
- **Spring Security**: Provides security features including authentication and authorization.
- **JWT (JSON Web Token)**: For secure token-based authentication.
- **Hibernate**: ORM framework for database interaction.
- **Swagger**: API documentation tool.
- **Maven**: Dependency management and build automation.

## Features
- **Admin Authentication**: 
  - Sign Up: Create a new admin account.
  - Login: Authenticate admin and obtain JWT token.
  - Logout: Invalidate the admin's token.
  - Send OTP: Send a one-time password for verification.
  - Forgot Password: Reset admin password.

- **Student Management**:
  - Add Student: Add a new student record.
  - Get Student By ID: Retrieve student details using their ID.
  - Get Student By Name: Retrieve student details using their name.

## API Endpoints
| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| POST   | `/api/public/session/signup`               | Sign up a new admin            |
| POST   | `/api/public/session/login`                | Login admin and return JWT     |
| POST   | `/api/public/session/logout`               | Logout admin                   |
| POST   | `/api/public/session/sendotp`              | Send OTP for verification      |
| POST   | `/api/public/session/forgotpassword`       | Reset user password            |
| POST   | `/api/private/admin/addstudent`                  | Add a new student             |
| GET    | `/api/private/admin/getStudentById/{id}`             | Get student by ID             |
| GET    | `/api/private/admin/getStudentByName?characters=s`      | Get student by name           |


