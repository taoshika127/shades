# Pacific Light Shades & Blinds - E-commerce Website

A modern, full-stack e-commerce website built with React, TypeScript, and Node.js.

## Features

- 🏠 Modern homepage with hero section
- 🛍️ Product catalog with grid layout
- 📱 Responsive design for all devices
- 🎨 Beautiful UI with clean aesthetics
- 🖼️ Image carousel for room inspirations
- 📧 Newsletter subscription
- 🔍 Search and favorites icons (UI only)

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies for root, frontend, and backend:
```bash
npm run install:all
```

Or manually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Development

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Frontend (port 3000):
```bash
npm run dev:frontend
```

Backend (port 5000):
```bash
npm run dev:backend
```

### Build

Build the frontend for production:
```bash
npm run build
```

## Project Structure

```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── ...
│   └── ...
├── backend/          # Node.js backend API
│   ├── src/
│   │   └── index.ts  # Express server
│   └── ...
└── package.json      # Root package.json
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/categories` - Get all categories
- `GET /api/inspirations` - Get room inspirations
- `GET /api/social-images` - Get social gallery images
- `POST /api/newsletter` - Subscribe to newsletter

## Notes

- Images are sourced from Unsplash (placeholder images)
- All product data is mock data stored in the backend
- The application is ready for further customization and integration with a real database
