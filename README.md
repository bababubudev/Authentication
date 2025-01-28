# Authentication Project

## Overview
Full-stack authentication system with user and admin functionalities using Node.js, Express, PostgreSQL, and React. Deployed using GitHub Container Registry (GHCR) and GitHub Actions for CI/CD.

![image](https://github.com/user-attachments/assets/e1dabc40-5c21-4761-a671-e9245f7be3ed)

## Features
- User registration and login
- Role-based access control
- Password management
- User session handling
- Admin dashboard
- Automated container builds and deployments
- Version-controlled Docker images

## Tech Stack
- Backend: Node.js, Express, PostgreSQL
- Frontend: React, TypeScript
- Containerization: Docker, Docker Compose
- CI/CD: GitHub Actions
- Container Registry: GitHub Container Registry (GHCR)

## Prerequisites
- Docker
- Docker Compose
- GitHub Account with Container Registry access

## Installation & Setup

### Using Pre-built Images
1. Clone the repository
2. Create a `.env` file in the root directory (see Environment Variables section)
3. Run: `docker compose up`

### Building Locally
1. Clone the repository
2. Create a `.env` file in the root directory
3. Run: `docker compose up --build`

## Container Registry
All Docker images are automatically built and pushed to GitHub Container Registry:
- Frontend: `ghcr.io/<username>/nodeauth-frontend:latest`
- Backend: `ghcr.io/<username>/nodeauth-backend:latest`
- Database: `ghcr.io/<username>/nodeauth-postgres:latest`

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# GitHub Container Registry
GITHUB_USER=your-github-username

# Database Configuration
POSTGRES_USER=your-db-user
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=your-db-name

# Backend Configuration
SERVER_PORT=6060
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-secure-session-secret
```

## CI/CD Pipeline
The project uses GitHub Actions for automated builds and deployments:
- Triggers on push to main branch
- Builds Docker images for all services
- Pushes images to GitHub Container Registry
- Tags images with both 'latest' and commit SHA

## Docker Configuration
Three containerized services:
- PostgreSQL database (Port 5432)
- Backend service (Port 6060)
- Frontend service (Port 5173)

## Security Features
- Password hashing with bcrypt
- Input validation
- Role-based access control
- Secure session management
- Environment variable management
- Containerized services

## Accessing Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:6060`

## Development
To contribute or modify:
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Create a pull request

## GitHub Container Registry Setup
1. Ensure you have a GitHub Personal Access Token with `write:packages` scope
2. Login to GHCR:
```bash
docker login ghcr.io -u YOUR_GITHUB_USERNAME -p YOUR_GITHUB_PAT
```

## Troubleshooting
- Ensure all required GitHub secrets are configured
- Check Docker and Docker Compose installations
- Verify environment variables in `.env` file
- Confirm GitHub Container Registry access
