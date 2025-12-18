# How to Run the Server

## Prerequisites
- Node.js (v18 or higher)
- npm installed

## Installation

1. **Install all dependencies** (if you haven't already):
```bash
npm run install:all
```

Or manually install in each directory:
```bash
npm install                    # Root dependencies
cd frontend && npm install     # Frontend dependencies
cd ../backend && npm install   # Backend dependencies
```

## Running the Server

### Option 1: Run Both Frontend and Backend Together (Recommended)

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5001`
- Frontend development server on `http://localhost:3000`

**Note:** Port 5001 is used instead of 5000 because macOS AirPlay Receiver uses port 5000 by default.

### Option 2: Run Separately

**Backend only:**
```bash
npm run dev:backend
```
Or from the backend directory:
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
npm run dev:frontend
```
Or from the frontend directory:
```bash
cd frontend
npm run dev
```

## Database

The SQLite database is automatically created when the backend server starts:
- Location: `backend/data/categories.db`
- The database directory (`backend/data/`) is created automatically
- Initial categories are seeded on first run

## Troubleshooting

### Error: "Cannot open database because the directory does not exist"

If you see this error:
1. Make sure you're in the correct directory
2. The data directory should be created automatically, but you can create it manually:
   ```bash
   mkdir -p backend/data
   ```

### Port Already in Use

If port 5001 (backend) or 3000 (frontend) is already in use:
- Backend: Set `PORT` environment variable or change it in `backend/src/index.ts` (default is 5001 to avoid conflict with macOS AirPlay on port 5000)
- Frontend: Change port in `frontend/vite.config.ts`

**Note:** Port 5000 is commonly used by macOS AirPlay Receiver, so the backend uses port 5001 by default.

## Production Build

To build for production:
```bash
npm run build
```

To run the production backend:
```bash
npm start
```

## API Endpoints

Once the server is running, you can access:
- `GET http://localhost:5001/api/categories` - Get all categories
- `POST http://localhost:5001/api/categories` - Create a new category
- `GET http://localhost:5001/api/products` - Get all products
- `GET http://localhost:5001/api/inspirations` - Get room inspirations

The frontend will automatically proxy API requests from `/api/*` to `http://localhost:5001/api/*`.

