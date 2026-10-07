# Manorama Multispeciality Dental Clinic

A premium, production-quality dental clinic website built for Dr. Amit Kumar Dubey.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, CSS Modules
- **Backend:** Node.js, Express, TypeScript

## Features

- Fully responsive premium design
- Client-side routing with React Router
- Component-based architecture
- Appointment booking API integration
- SEO & Accessibility friendly
- Strong typing with TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file in the `backend` directory based on `.env.example`:

```bash
cd backend
cp .env.example .env
```

### Running Locally

**Start the Backend API Server:**
```bash
cd backend
npx nodemon src/server.ts
```

**Start the Frontend Development Server:**
```bash
cd frontend
npm run dev
```

## Production Build

To build the frontend for production:
```bash
cd frontend
npm run build
```

## Deployment Notes

- Ensure `PORT` is appropriately configured in production.
- Use a reverse proxy (e.g., Nginx) or a managed platform (e.g., Vercel for frontend, Render/Railway for backend) for deployment.
- Never commit the `.env` file to source control.
