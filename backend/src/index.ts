import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initializeDatabase, categoryDb, zipcodeDb } from './database';
import getDatabase from './database';
import { sendContactEmail, sendConsultationEmail, sendQuoteEmail } from './emailService';

dotenv.config();

// Multer types (will be available after npm install)
type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let multer: any;
let upload: any;

try {
  multer = require('multer');

  const storage = multer.diskStorage({
    destination: (_req: any, _file: any, cb: any) => {
      cb(null, uploadDir);
    },
    filename: (_req: any, file: any, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });

  upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit per file
    },
    fileFilter: (_req: any, file: any, cb: any) => {
      // Allow images and common document types
      const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|txt|xls|xlsx/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images and documents are allowed.'));
      }
    }
  });
} catch (error) {
  console.warn('Multer not installed. File uploads will not work. Run: npm install multer @types/multer');
}

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

// PUT endpoint to update category by name (useful for migrations)
app.put('/api/categories/update-by-name', (req, res) => {
  try {
    const { oldName, newName, image } = req.body;

    if (!oldName) {
      return res.status(400).json({ error: 'oldName is required' });
    }

    const database = getDatabase();
    const stmt = database.prepare('UPDATE categories SET name = COALESCE(?, name), image = COALESCE(?, image), updated_at = CURRENT_TIMESTAMP WHERE LOWER(name) = LOWER(?)');
    const result = stmt.run(newName || null, image || null, oldName);

    if (result.changes === 0) {
      return res.status(404).json({ error: `Category "${oldName}" not found` });
    }

    const updated = database.prepare('SELECT * FROM categories WHERE LOWER(name) = LOWER(?)').get(newName || oldName);
    res.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.get('/api/inspirations', (req, res) => {
  res.json(roomInspirations);
});

app.get('/api/social-images', (req, res) => {
  res.json(socialImages);
});

// Gallery images from our-gallery folder
const galleryImages = [
  { id: 1, image: '/assets/our-gallery/gallery1/gallery1.jpg', alt: 'Gallery image 1' },
  { id: 2, image: '/assets/our-gallery/gallery2/gallery2.jpg', alt: 'Gallery image 2' },
  { id: 3, image: '/assets/our-gallery/gallery3/gallery3.jpg', alt: 'Gallery image 3' },
  { id: 4, image: '/assets/our-gallery/gallery4/gallery4.jpg', alt: 'Gallery image 4' },
  { id: 5, image: '/assets/our-gallery/gallery5/gallery5.jpg', alt: 'Gallery image 5' },
  { id: 6, image: '/assets/our-gallery/gallery6/gallery6.jpg', alt: 'Gallery image 6' },
  { id: 7, image: '/assets/our-gallery/gallery7/gallery7.jpg', alt: 'Gallery image 7' },
  { id: 8, image: '/assets/our-gallery/gallery8/gallery8.jpg', alt: 'Gallery image 8' },
  { id: 9, image: '/assets/our-gallery/gallery9/gallery9.jpg', alt: 'Gallery image 9' },
  { id: 10, image: '/assets/our-gallery/gallery10/gallery10.jpg', alt: 'Gallery image 10' },
  { id: 11, image: '/assets/our-gallery/gallery11/gallery11.jpg', alt: 'Gallery image 11' },
  { id: 12, image: '/assets/our-gallery/gallery12/gallery12.jpg', alt: 'Gallery image 12' },
  { id: 13, image: '/assets/our-gallery/gallery13/gallery13.jpg', alt: 'Gallery image 13' },
  { id: 14, image: '/assets/our-gallery/gallery14/gallery14.jpg', alt: 'Gallery image 14' },
  { id: 15, image: '/assets/our-gallery/gallery15/gallery15.jpg', alt: 'Gallery image 15' },
];

app.get('/api/gallery-images', (req, res) => {
  res.json(galleryImages);
});

// Gallery data interface
interface GalleryData {
  images: string[];
  location: string;
  description: string;
  design?: { [roomType: string]: string };
}

// Gallery images by gallery ID - returns all images with metadata for a specific gallery
// Can be either GalleryData (new format) or string[] (old format for backward compatibility)
const galleryImageMap: { [key: number]: GalleryData | string[] } = {
  1: {
    images: ['/assets/our-gallery/gallery1/gallery1.jpg', '/assets/our-gallery/gallery1/gallery1-1.jpg', '/assets/our-gallery/gallery1/gallery1-2.jpg'],
    location: 'Seattle, WA',
    description: 'This customer is from Seattle, and initially had concerns about ordering custom window shades from overseas—mainly about measurements, fabric quality, and visible seams. After installation, those worries were completely gone. He was especially impressed with the soft, refined texture of the fabric and how gently the light filters through without being harsh. The seams are nearly invisible, giving the shades a very clean and high-end look. During the day, the space feels bright and natural, and in the evening, the shades help create a warm, finished atmosphere. He shared that choosing higher-quality shades for large windows made a noticeable difference and felt he made the right decision.',
    design: {
      'Living Room': 'Premium sheer window shades'
    }
  },
  2: {
    images: ['/assets/our-gallery/gallery2/gallery2.jpg', '/assets/our-gallery/gallery2/gallery2-1.jpg', '/assets/our-gallery/gallery2/gallery2-2.jpg', '/assets/our-gallery/gallery2/gallery2-3.jpg'],
    location: 'Tokyo, Japan',
    description: 'This customer was discouraged by local pricing, which started very high with installation included. After finding us, they followed our measurement guide, selected the fabric, color, and style, and customized a total of 18 window shades for multiple rooms. The final cost was significantly lower than local quotes, even with international air shipping included. Delivery was fast, installation was smooth with our video guidance, and the customer shared that the overall experience was much easier than expected.',
    design: {
      'Living Room & Balcony': 'Sheer / light-filtering curtains',
      'Bedrooms': 'Same-style coordinated shades for consistency',
      'Small Windows': 'Korean-style zebra blinds, fully customized to fit (as narrow as 23 cm)'
    }
  },
  3: {
    images: ['/assets/our-gallery/gallery3/gallery3.jpg', '/assets/our-gallery/gallery3/gallery3-1.jpg', '/assets/our-gallery/gallery3/gallery3-2.jpg', '/assets/our-gallery/gallery3/gallery3-3.jpg', '/assets/our-gallery/gallery3/gallery3-4.jpg', '/assets/our-gallery/gallery3/gallery3-5.jpg', '/assets/our-gallery/gallery3/gallery3-6.jpg', '/assets/our-gallery/gallery3/gallery3-7.jpg', '/assets/our-gallery/gallery3/gallery3-8.jpg'],
    location: 'New York, NY',
    description: 'This customer customized window treatments for the entire home. She selected different solutions for each space, including wood blinds for the study and bathroom, double-layer fabric curtains for the bedroom, and white linen sheers for the living room. All measurements were precise, with clean seams and a refined finish, and the customer shared that the curtains became the most impressive part of her renovation. She felt the overall look was high-end and said the window treatments made the biggest difference in the final result.',
    design: {
      'Bedrooms': 'Zebra blinds – full blackout',
      'Living / Other Rooms': 'Zebra blinds – light-filtering',
      'Overall': 'Mixed blackout and semi-blackout combinations for flexibility'
    }
  },
  4: {
    images: ['/assets/our-gallery/gallery4/gallery4.jpg', '/assets/our-gallery/gallery4/gallery4-1.jpg', '/assets/our-gallery/gallery4/gallery4-2.jpg', '/assets/our-gallery/gallery4/gallery4-3.jpg', '/assets/our-gallery/gallery4/gallery4-4.jpg', '/assets/our-gallery/gallery4/gallery4-5.jpg', '/assets/our-gallery/gallery4/gallery4-6.jpg', '/assets/our-gallery/gallery4/gallery4-7.jpg', '/assets/our-gallery/gallery4/gallery4-8.jpg'],
    location: 'Dallas, TX',
    description: 'This customer is from Dallas and it was her third time working with us for custom window treatments. She initially had concerns about quality, delivery, and overseas ordering, so she first placed a smaller trial order and was very satisfied with both the product and our installation guidance. For her new home, we customized a full-house solution with different styles for each space, including sheer curtains, zebra blinds, roller shades, and double-layer drapery. After installation, she shared that she was very happy with the results and has already recommended us to her colleagues.',
    design: {
      'Study & Bathroom': 'Wood blinds (adjustable light control)',
      'Bedrooms': 'Double-layer fabric curtains (sheer + blackout)',
      'Living Room': 'White linen sheer curtains (bright but private)'
    }
  },
  5: {
    images: ['/assets/our-gallery/gallery5/gallery5.jpg', '/assets/our-gallery/gallery5/gallery5-1.jpg'],
    location: 'San Francisco, CA',
    description: 'This customer has selected these soft Roman shades paired with textured linen sheers. The Roman shades are custom-made to size and designed to feel relaxed, not stiff. The fabric softly filters light, showing subtle texture without being overpowering, making the space feel warm and lived-in. This combination is ideal for customers who want natural light, a clean look, and an everyday comfort that doesn\'t try too hard to stand out.',
    design: {
      'Living Room': 'Sheer curtains + zebra blinds',
      'Bathrooms': 'Shangri-La (silhouette-style) shades',
      'Vanity & Secondary Bedroom': 'Roman shades',
      'Master Bedroom': 'Double-layer fabric curtains with black recessed rods'
    }
  },
  6: {
    images: ['/assets/our-gallery/gallery6/gallery6.jpg', '/assets/our-gallery/gallery6/gallery6-1.jpg', '/assets/our-gallery/gallery6/gallery6-2.jpg'],
    location: 'Vancouver, Canada',
    description: 'This customer originally received local quotes of $3,200–$4,000 CAD for just five zebra blinds. After finding us, they customized 8 zebra blinds with a mix of blackout and light-filtering options, and even with international FedEx air shipping included, the total cost was still about half of local pricing. The products arrived within one week, well-packaged, and the customer was very satisfied with the thickness and quality of the fabric. They shared that the blackout effect made a noticeable difference and highly recommended the experience.',
    design: {
      'Main Living Spaces': 'Soft Roman shades (relaxed structure) and textured linen sheers for gentle light diffusion'
    }
  },
  7: {
    images: ['/assets/our-gallery/gallery7/gallery7.jpg', '/assets/our-gallery/gallery7/gallery7-1.jpg', '/assets/our-gallery/gallery7/gallery7-2.jpg'],
    location: 'Chicago, IL',
    description: 'This customer in North America chose to customize and ship window treatments from overseas due to limited local options and higher pricing. We designed different solutions for each space—layered sheers for the living room, waterproof zebra blinds for the kitchen, honeycomb shades for the guest room, and a sheer plus blackout combination for the master bedroom—to balance light control and aesthetics. During consultation, we also advised against a full wall curtain installation based on the actual window structure, which the customer appreciated as honest and thoughtful guidance.',
    design: {
      'Living Room': 'Double-layer sheers (high-transparency + linen sheer)',
      'Kitchen': 'Waterproof zebra blinds (adjustable light control)',
      'Guest Room': 'Day–night honeycomb shades',
      'Master Bedroom': 'Mirror sheer + blackout fabric curtain'
    }
  },
  8: {
    images: ['/assets/our-gallery/gallery8/gallery8.jpg', '/assets/our-gallery/gallery8/gallery8-1.jpg'],
    location: 'Queen Creek, AZ',
    description: 'This North American customer followed a structured custom-order process, from one-on-one consultation and style selection to precise measurements and production approval. After payment, quality inspection photos were shared, and the shades were delivered by air freight within days, arriving well-packaged and intact. Installation was completed smoothly with video guidance, and the customer shared that the overall experience was reliable, efficient, and saved over 60% compared to local pricing.',
    design: {
      'Bedrooms / Sleeping Areas': 'Honeycomb (cellular) shades. Full blackout option. Energy-efficient structure',
      'Overall': 'Custom-sized shades with air shipping and DIY installation support'
    }
  },
  9: {
    images: ['/assets/our-gallery/gallery9/gallery9.jpg', '/assets/our-gallery/gallery9/gallery9-1.jpg', '/assets/our-gallery/gallery9/gallery9-2.jpg', '/assets/our-gallery/gallery9/gallery9-3.jpg', '/assets/our-gallery/gallery9/gallery9-4.jpg', '/assets/our-gallery/gallery9/gallery9-5.jpg', '/assets/our-gallery/gallery9/gallery9-6.jpg', '/assets/our-gallery/gallery9/gallery9-7.jpg', '/assets/our-gallery/gallery9/gallery9-8.jpg', '/assets/our-gallery/gallery9/gallery9-9.jpg'],
    location: 'Houston, TX',
    description: 'This customer customized window treatments for the entire home using our North America sea-shipping service. The solution included motorized shades, sheer curtains, and layered drapery, all finished with high-temperature shaping for a clean and polished look. The customer was very pleased with the final result and appreciated the convenience of a one-stop custom service from overseas.',
    design: {
      'Master Bedroom': 'Motorized irregular-shaped blackout shades',
      'Living Room': 'Motorized sheer curtains for tall or high windows',
      'Dining Area': 'Black Roman rods paired with sheer curtains',
      'Guest Bedroom': 'Layered curtains (one sheer + one fabric curtain)'
    }
  },
  10: {
    images: ['/assets/our-gallery/gallery10/gallery10.jpg', '/assets/our-gallery/gallery10/gallery10-1.jpg', '/assets/our-gallery/gallery10/gallery10-2.jpg', '/assets/our-gallery/gallery10/gallery10-3.jpg', '/assets/our-gallery/gallery10/gallery10-4.jpg', '/assets/our-gallery/gallery10/gallery10-5.jpg', '/assets/our-gallery/gallery10/gallery10-6.jpg'],
    location: 'Seattle, WA',
    description: 'This project was completed with full responsibility handled by our team from design to delivery. After the curtains arrived, installation was completed either independently with our video guidance or by a local partner installer. The customer especially loved the custom details, including a playful bird-pattern curtain made specifically for their home.',
    design: {
      'Living Areas': 'Custom fabric curtains with soft light-filtering sheers',
      'Children\'s / Accent Space': 'Custom patterned curtains (bird motif)',
      'Other Rooms': 'Simple, clean-lined fabric curtains designed for easy installation'
    }
  },
  11: {
    images: ['/assets/our-gallery/gallery11/gallery11.jpg', '/assets/our-gallery/gallery11/gallery11-1.jpg', '/assets/our-gallery/gallery11/gallery11-2.jpg', '/assets/our-gallery/gallery11/gallery11-3.jpg', '/assets/our-gallery/gallery11/gallery11-4.jpg', '/assets/our-gallery/gallery11/gallery11-5.jpg', '/assets/our-gallery/gallery11/gallery11-6.jpg', '/assets/our-gallery/gallery11/gallery11-7.jpg', '/assets/our-gallery/gallery11/gallery11-8.jpg'],
    location: 'Seattle, WA',
    description: 'This customer chose a full-house custom window treatment solution, from design and measurement guidance to production, shipping, and local installation.',
    design: {
      'Living & Common Areas': 'Linen-textured sheer curtains + linen Roman shades',
      'Bathrooms & Study': 'Adjustable Shangri-La (silhouette-style) shades',
      'Bedrooms': 'Full blackout fabric curtains paired with matching Roman shades'
    }
  },
  12: {
    images: ['/assets/our-gallery/gallery12/gallery12.jpg', '/assets/our-gallery/gallery12/gallery12-1.jpg', '/assets/our-gallery/gallery12/gallery12-2.jpg'],
    location: 'Bay Area, CA',
    description: 'This customer customized motorizedfabric curtains for the entire house. The system allows smooth, quiet operation and can be controlled easily by remote, making daily use both convenient and comfortable. After installation, the overall space felt more cohesive and elevated, and the customer was very satisfied with both the functionality and the final look.',
    design: {
      'Living Room': 'Motorized fabric curtains made from cotton and linen blend'
    }
  },
  13: {
    images: ['/assets/our-gallery/gallery13/gallery13.jpg', '/assets/our-gallery/gallery13/gallery13-1.jpg', '/assets/our-gallery/gallery13/gallery13-2.jpg', '/assets/our-gallery/gallery13/gallery13-3.jpg', '/assets/our-gallery/gallery13/gallery13-4.jpg', '/assets/our-gallery/gallery13/gallery13-5.jpg', '/assets/our-gallery/gallery13/gallery13-6.jpg', '/assets/our-gallery/gallery13/gallery13-7.jpg', '/assets/our-gallery/gallery13/gallery13-8.jpg'],
    location: 'Ottawa, Canada',
    description: 'This customer customized different window treatments throughout the home, including Shangri-La shades, Roman shades, honeycomb shades, and zebra blinds. The order was produced domestically and shipped quickly, with local installation arranged, and the customer felt the quality and service far exceeded expectations. After nearly two years of use, they shared that the shades are still performing beautifully and confidently recommended us to others.',
    design: {
      'Living Room': 'Motorized Shangri-La (silhouette-style) shades',
      'Second Floor / Guest Bedroom': 'Manual Shangri-La shades',
      'Master Bedroom': 'Motorized day & night honeycomb (cellular) shades',
      'Basement': 'Manual black zebra blinds'
    }
  },
  14: {
    images: ['/assets/our-gallery/gallery14/gallery14.jpg', '/assets/our-gallery/gallery14/gallery14-1.jpg', '/assets/our-gallery/gallery14/gallery14-2.jpg'],
    location: 'New York, NY',
    description: 'This customer chose linen Roman shades for the bedroom to complement the outdoor view, especially during the spring bloom season. The natural linen texture blends seamlessly with the scenery outside, making the window view part of the interior design. The customer shared that the room feels brighter, fresher, and more relaxing every day.',
    design: {
      'Bedroom': 'Linen Roman shades'
    }
  },
  15: {
    images: ['/assets/our-gallery/gallery15/gallery15.jpg', '/assets/our-gallery/gallery15/gallery15-1.jpg', '/assets/our-gallery/gallery15/gallery15-2.jpg', '/assets/our-gallery/gallery15/gallery15-3.jpg', '/assets/our-gallery/gallery15/gallery15-4.jpg'],
    location: 'Bay Area, CA',
    description: 'This customer customized natural linen curtains made from a linen and jute blend, using pure plant-based materials with no synthetic fibers. After installation, the space felt calm, warm, and full of atmosphere, and the customer shared the photos in a North American renovation group. This post even led to new customers placing orders after seeing the real-life results.',
    design: {
      'Living Room': 'Natural linen curtains made from a linen and jute blend, using pure plant-based materials with no synthetic fibers'
    }
  },
};

app.get('/api/gallery/:id', (req, res) => {
  const galleryId = parseInt(req.params.id);
  const galleryData = galleryImageMap[galleryId];

  if (!galleryData) {
    return res.status(404).json({ error: 'Gallery not found' });
  }

  // Handle both old format (string[]) and new format (GalleryData)
  if (Array.isArray(galleryData)) {
    // Old format - convert to new format with empty metadata
    res.json({
      id: galleryId,
      images: galleryData,
      location: '',
      description: '',
      design: undefined
    });
  } else {
    // New format - return with metadata
    res.json({
      id: galleryId,
      images: galleryData.images,
      location: galleryData.location,
      description: galleryData.description,
      design: galleryData.design
    });
  }
});

// Check if zipcode is in service area
app.get('/api/check-zipcode/:zipcode', (req, res) => {
  const { zipcode } = req.params;

  if (!zipcode || zipcode.trim() === '') {
    return res.status(400).json({ error: 'Zipcode is required' });
  }

  const isInServiceArea = zipcodeDb.isInServiceArea(zipcode.trim());
  res.json({ inServiceArea: isInServiceArea });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  console.log('Newsletter subscription:', email);
  res.json({ success: true, message: 'Successfully subscribed to newsletter' });
});

const contactHandler = async (req: Request, res: express.Response) => {
  try {
    const { name, email, phone, zipCode, subject, message } = req.body;
    // Handle multer files - can be array or object
    const multerFiles = req.files;
    const files: MulterFile[] = Array.isArray(multerFiles)
      ? multerFiles as MulterFile[]
      : multerFiles && typeof multerFiles === 'object' && 'attachments' in multerFiles
      ? (multerFiles.attachments as MulterFile[])
      : [];

    // Validate required fields
    if (!name || !email || !subject || !message) {
      // Clean up uploaded files if validation fails
      if (files && files.length > 0) {
        files.forEach(file => {
          const filePath = path.join(uploadDir, file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required'
      });
    }

    // Log the submission
    console.log('Contact form submission:', { name, email, phone, zipCode, subject, message, fileCount: files?.length || 0 });

    // Send email with attachments
    const emailSent = await sendContactEmail({
      name,
      email,
      phone,
      zipCode,
      subject,
      message
    }, files || []);

    // Clean up uploaded files after sending email
    if (files && files.length > 0) {
      files.forEach(file => {
        const filePath = path.join(uploadDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    if (emailSent) {
      res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } else {
      // Still return success to user, but log the error
      console.error('Failed to send email, but form submission was received');
      res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Clean up uploaded files on error
    const errorFiles = req.files;
    if (errorFiles) {
      const filesToClean: MulterFile[] = Array.isArray(errorFiles)
        ? errorFiles as MulterFile[]
        : errorFiles && typeof errorFiles === 'object' && 'attachments' in errorFiles
        ? (errorFiles.attachments as MulterFile[])
        : [];

      filesToClean.forEach(file => {
        const filePath = path.join(uploadDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.'
    });
  }
};

if (upload) {
  app.post('/api/contact', upload.array('attachments', 10), contactHandler);
} else {
  app.post('/api/contact', contactHandler);
}

// Consultation endpoint
app.post('/api/consultation', express.json(), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      serviceAddress,
      consultationType,
      preferredTime,
      lookingFor,
      installTimeline,
      numberOfWindows,
      budgetRange,
      additionalInfo
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !serviceAddress || !consultationType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, serviceAddress, and consultationType are required'
      });
    }

    // Log the submission
    console.log('Consultation form submission:', {
      fullName,
      email,
      phone,
      serviceAddress,
      consultationType,
      preferredTime,
      lookingFor,
      installTimeline,
      numberOfWindows,
      budgetRange,
      additionalInfo
    });

    // Send email
    const emailSent = await sendConsultationEmail({
      fullName,
      email,
      phone,
      serviceAddress,
      consultationType,
      preferredTime: preferredTime || [],
      lookingFor: lookingFor || [],
      installTimeline,
      numberOfWindows: numberOfWindows || [],
      budgetRange,
      additionalInfo
    });

    if (emailSent) {
      res.json({
        success: true,
        message: 'Thank you for scheduling a consultation! We will contact you soon.'
      });
    } else {
      // Still return success to user, but log the error
      console.error('Failed to send email, but consultation submission was received');
      res.json({
        success: true,
        message: 'Thank you for scheduling a consultation! We will contact you soon.'
      });
    }
  } catch (error) {
    console.error('Error processing consultation form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your consultation request. Please try again later.'
    });
  }
});

// Quote endpoint
app.post('/api/quote', express.json(), async (req, res) => {
  try {
    const { formData, windows } = req.body;

    // Validate required fields
    if (!formData || !windows || !Array.isArray(windows) || windows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: formData and windows are required'
      });
    }

    // Log the submission
    console.log('Quote form submission:', { formData, windowCount: windows.length });

    // Send email
    const emailSent = await sendQuoteEmail({ formData, windows });

    if (emailSent) {
      res.json({
        success: true,
        message: 'Thank you for your quote request! We will review your information and send you a detailed quote shortly.'
      });
    } else {
      // Still return success to user, but log the error
      console.error('Failed to send email, but quote submission was received');
      res.json({
        success: true,
        message: 'Thank you for your quote request! We will review your information and send you a detailed quote shortly.'
      });
    }
  } catch (error) {
    console.error('Error processing quote form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your quote request. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
