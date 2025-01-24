# Authentication Project

## Overview
Full-stack authentication system with user and admin functionalities using Node.js, Express, PostgreSQL, and React.

![image](https://github.com/user-attachments/assets/e1dabc40-5c21-4761-a671-e9245f7be3ed)



## Features
- User registration and login
- Role-based access control
- Password management
- User session handling
- Admin dashboard

## Tech Stack
- Backend: Node.js, Express, PostgreSQL
- Frontend: React, TypeScript
- Containerization: Docker, Docker Compose

## Prerequisites
- Docker
- Docker Compose

## Installation & Setup
1. Clone repository
2. Run: `docker-compose up --build`

## Docker Configuration
- PostgreSQL database service
- Backend service (Port 3001)
- Frontend service (Port 3000)

## Environment Variables
Configured in `docker-compose.yml`:
- Database credentials
- Session secrets
- Server ports

## Security Features
- Password hashing
- Input validation
- Role-based access control
- Secure session management

## Accessing Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
