# Royal Student Project

## Overview
The Royal Student Project is a full-stack application designed to manage student data efficiently. The backend is built with Spring Boot and Hibernate for robust database management, while the frontend leverages React and Tailwind CSS for a modern and responsive user interface. The project incorporates secure user authentication, role-based access control, and CRUD operations, alongside RESTful APIs, JWT token authentication, and Swagger documentation for enhanced usability and extensibility.

## Technologies Used
### Backend
- **Spring Boot**: Framework for building the application.
- **Spring Security**: Provides security features including authentication and authorization.
- **JWT (JSON Web Token)**: For secure token-based authentication.
- **Hibernate**: ORM framework for database interaction.
- **Swagger**: API documentation tool.
- **Maven**: Dependency management and build automation.

### Frontend
- **React**: Library for building dynamic and interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive and visually appealing design.

## Features
### Admin Authentication
- **Sign Up**: Create a new admin account.
- **Login**: Authenticate admin and obtain JWT token.
- **Logout**: Invalidate the admin's token.
- **Send OTP**: Send a one-time password for verification.
- **Forgot Password**: Reset admin password.

### Student Management
- **Add Student**: Add a new student record.
- **Get Student By ID**: Retrieve student details using their ID.
- **Get Student By Name**: Retrieve student details using their name.
- **Update Student**: Update existing student information.
- **Delete Student**: Remove student records securely.

### Frontend Highlights
- **Dynamic UI**: React provides a seamless and dynamic interface for managing students and administrators.  
- **Responsive Design**: Tailwind CSS ensures the application is fully responsive and accessible across devices.  
- **Interactive Components**: Leverages React's state management for intuitive user interactions.  
- **Custom Styling**: Tailwind CSS utilities make it easy to style components efficiently and consistently.  

## API Endpoints
| Method | Endpoint                                   | Description                    |
|--------|-------------------------------------------|--------------------------------|
| POST   | `/api/public/session/signup`              | Sign up a new admin            |
| POST   | `/api/public/session/login`               | Login admin and return JWT     |
| POST   | `/api/public/session/logout`              | Logout admin                   |
| POST   | `/api/public/session/sendotp`             | Send OTP for verification      |
| POST   | `/api/public/session/forgotpassword`      | Reset user password            |
| POST   | `/api/private/admin/addstudent`           | Add a new student              |
| GET    | `/api/private/admin/getStudentById/{id}`  | Get student by ID              |
| GET    | `/api/private/admin/getStudentByName?characters=s` | Get student by name           |
| PUT    | `/api/private/admin/updatestudent/{id}`   | Update student details         |
| DELETE | `/api/private/admin/deletestudent/{id}`   | Delete student record          |

## Frontend Highlights
- **Dynamic UI**: React provides a seamless and dynamic interface for managing students and administrators.  
- **Responsive Design**: Tailwind CSS ensures the application is fully responsive and accessible across devices.  
- **Interactive Components**: Leverages React's state management for intuitive user interactions.  
- **Custom Styling**: Tailwind CSS utilities make it easy to style components efficiently and consistently.  

## Key Benefits
1. **Full-Stack Integration**: Combines a powerful Spring Boot backend with a dynamic React-based frontend for a cohesive application.  
2. **Secure and Scalable**: Implements JWT authentication and role-based access control, ensuring data security and scalability.  
3. **User-Friendly Interface**: The React and Tailwind CSS frontend offers a modern and intuitive user experience.  
4. **API Documentation**: Swagger integration simplifies API exploration and testing for developers.  
5. **Efficient Data Management**: Hibernate streamlines database interactions with efficient ORM capabilities.  

## How It Works
1. **Admin Onboarding**:  
   - The admin signs up, logs in, and uses the JWT token to interact with secure endpoints.  
   - OTP-based verification and password reset features enhance security.

2. **Student Management**:  
   - Admins can add new students, retrieve specific student details by ID or name, and manage the student database seamlessly.  

3. **Frontend Interaction**:  
   - React provides a responsive and interactive interface for admin operations.  
   - Tailwind CSS ensures the application maintains a clean, modern, and user-friendly design.  
   - API integration enables real-time interaction between the frontend and backend.
  
## Conclusion
The Royal Student Project demonstrates the power of combining modern technologies like Spring Boot, React, Hibernate, and Tailwind CSS to create a secure, user-friendly, and highly functional application. It serves as a comprehensive platform for managing student data, with features that can evolve to meet future requirements.






