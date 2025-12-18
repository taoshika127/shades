import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { initializeDatabase, categoryDb } from './database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Initialize database (this will create the directory if needed)
initializeDatabase();

// Mock data for products - expanded to 32 items for Shades page
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  badge?: 'sale' | 'new';
}

const baseProducts: Product[] = [
  {
    id: 1,
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    price: 2500000,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    badge: 'sale'
  },
  {
    id: 2,
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Lolito',
    description: 'Luxury big sofa',
    price: 7000000,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    badge: 'sale'
  },
  {
    id: 4,
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    badge: 'new'
  },
  {
    id: 5,
    name: 'Grifo',
    description: 'Night lamp',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Muggo',
    description: 'Small mug',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1594736797933-d0d0c1f6b0c7?w=400&h=400&fit=crop',
    badge: 'new'
  },
  {
    id: 7,
    name: 'Pingky',
    description: 'Cube bed set',
    price: 7000000,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=400&h=400&fit=crop',
    badge: 'sale'
  },
  {
    id: 8,
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    badge: 'new'
  }
];

// Duplicate and modify products to reach 32 items
const products: Product[] = [];
for (let i = 0; i < 4; i++) {
  baseProducts.forEach((product, index) => {
    products.push({
      ...product,
      id: i * 8 + index + 1,
      name: i > 0 ? `${product.name} ${i + 1}` : product.name,
    });
  });
}

// Categories are now stored in the database

const roomInspirations = [
  {
    id: 1,
    title: 'Inner Peace',
    category: 'Bed Room',
    image: 'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: 'Modern Dining',
    category: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: 'Cozy Living',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'
  }
];

const socialImages = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1594736797933-d0d0c1f6b0c7?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=300&fit=crop'
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Categories endpoints
app.get('/api/categories', (req, res) => {
  try {
    const categories = categoryDb.getAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', (req, res) => {
  try {
    const { name, image } = req.body;

    // Validate required fields
    if (!name || !image) {
      return res.status(400).json({
        error: 'Missing required fields: name and image are required'
      });
    }

    // Validate that name is a string
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        error: 'Name must be a non-empty string'
      });
    }

    // Validate that image is a string (URL or path)
    if (typeof image !== 'string' || image.trim().length === 0) {
      return res.status(400).json({
        error: 'Image must be a valid URL or path'
      });
    }

    // Insert category into database
    const newCategory = categoryDb.insert(name.trim(), image.trim());
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.get('/api/inspirations', (req, res) => {
  res.json(roomInspirations);
});

app.get('/api/social-images', (req, res) => {
  res.json(socialImages);
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  console.log('Newsletter subscription:', email);
  res.json({ success: true, message: 'Successfully subscribed to newsletter' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Contact form submission:', { name, email, subject, message });
  res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
