# Categories API Documentation

## Overview
The Categories API allows you to manage categories for the Light & Shade application. Categories are stored in a SQLite database.

## Endpoints

### GET /api/categories
Retrieve all categories from the database.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Motorized shades & Draperies",
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    "created_at": "2024-01-01 12:00:00",
    "updated_at": "2024-01-01 12:00:00"
  }
]
```

### POST /api/categories
Insert a new category into the database.

**Request Body:**
```json
{
  "name": "Roman Shades",
  "image": "https://example.com/image.jpg"
}
```

**Required Fields:**
- `name` (string): The name of the category
- `image` (string): URL or path to the category image

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Roman Shades",
  "image": "https://example.com/image.jpg",
  "created_at": "2024-01-01 12:00:00",
  "updated_at": "2024-01-01 12:00:00"
}
```

**Error Responses:**
- `400 Bad Request`: Missing or invalid required fields
- `500 Internal Server Error`: Database error

## Examples

### Using cURL

```bash
# Get all categories
curl http://localhost:5001/api/categories

# Create a new category
curl -X POST http://localhost:5001/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cellular Shades",
    "image": "https://images.unsplash.com/photo-1234567890?w=600&h=400&fit=crop"
  }'
```

### Using JavaScript/Fetch

```javascript
// Get all categories
fetch('/api/categories')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new category
fetch('/api/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Cellular Shades',
    image: 'https://images.unsplash.com/photo-1234567890?w=600&h=400&fit=crop'
  })
})
  .then(res => res.json())
  .then(data => console.log('Created:', data));
```

### Using Postman or similar tools

1. Set method to `POST`
2. URL: `http://localhost:5001/api/categories`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Your Category Name",
  "image": "https://your-image-url.com/image.jpg"
}
```

## Database Location
The SQLite database file is stored at: `backend/data/categories.db`

## Notes
- The database is automatically initialized with 3 default categories on first run
- Categories are automatically assigned an `id` when created
- `created_at` and `updated_at` timestamps are automatically managed
- The database file is excluded from version control (see .gitignore)

