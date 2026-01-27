import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Get the data directory path
function getDataDir(): string {
  // In development: __dirname = backend/src -> dataDir = backend/data
  // In production: __dirname = backend/dist -> dataDir = backend/data
  return path.join(__dirname, '../data');
}

// Ensure data directory exists and return the path
function ensureDataDir(): string {
  const dataDir = getDataDir();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

// Create database connection - lazy initialization
let db: Database.Database | null = null;

function getDatabase(): Database.Database {
  if (!db) {
    const dataDir = ensureDataDir();
    const dbPath = path.join(dataDir, 'categories.db');
    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
  }
  return db;
}

// Initialize database schema
export function initializeDatabase() {
  const database = getDatabase();
  // Create categories table if it doesn't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create zipcodes table if it doesn't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS zipcodes (
      zipcode TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if categories table is empty and seed with initial data
  const count = database.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };

  if (count.count === 0) {
    const insert = database.prepare('INSERT INTO categories (name, image) VALUES (?, ?)');

    const initialCategories = [
      ['Zebra Shades', '/assets/home/zebra_shades.jpg'],
      ['Honeycomb Shades', '/assets/home/honeycomb_shades.jpg'],
      ['Roller Shades', '/assets/home/roller_shades.png'],
      ['Shangri-La Shades', '/assets/home/shangri-la_shades.jpg'],
      ['Roman Shades', '/assets/home/roman_shades.jpeg'],
      ['Bamboo Shades', '/assets/home/bamboo_shades.jpg'],
      ['Draperies', '/assets/home/draperies.jpg'],
      ['Outdoor Shades', '/assets/home/outdoor_shades.jpg'],
      ['Dream Shades', '/assets/home/dream_shades.png'],
    ];

    const insertMany = database.transaction((categories) => {
      for (const category of categories) {
        insert.run(category[0], category[1]);
      }
    });

    insertMany(initialCategories);
    console.log('Database initialized with initial categories');
  }

  // Check if zipcodes table is empty and seed with service area zipcodes
  const zipcodeCount = database.prepare('SELECT COUNT(*) as count FROM zipcodes').get() as { count: number };

  if (zipcodeCount.count === 0) {
    const insertZipcode = database.prepare('INSERT INTO zipcodes (zipcode) VALUES (?)');

    const serviceAreaZipcodes = [
      '94303', '94302', '94309', '94301', '94306', '94026', '94305', '94025', '94043', '94304',
      '94027', '94035', '94023', '94040', '94039', '94042', '94041', '94063', '94560', '94089',
      '94064', '94061', '94022', '94555', '94024', '95002', '94085', '94088', '94028', '94086',
      '94538', '94070', '94065', '94087', '94537', '95054', '95134', '94062', '94002', '94404',
      '95015', '95051', '94536', '94587', '95014', '94403', '95052', '95055', '95056', '95050',
      '95036', '94545', '95129', '94020', '94402', '95053', '94539', '94544', '95131', '95117',
      '94497', '94401', '95101', '95035', '95130', '95128', '95110', '94542', '95071', '95070',
      '95126', '94540', '94543', '94557', '94074', '94541', '95196', '95103', '95106', '95108',
      '95109', '95115', '95150', '95151', '95152', '95153', '95154', '95155', '95156', '95157',
      '95158', '95159', '95160', '95161', '95164', '95170', '95172', '95173', '95190', '95191',
      '95193', '95194', '95009', '95011', '94586', '94580', '95113', '95008', '95112', '94010',
      '95133', '95192', '94019', '94011', '94579', '94021', '95132', '95116', '95125', '94578',
      '95030', '95124', '95122', '94546', '95031', '94577', '94128', '94552', '94030', '95118',
      '94018', '95032', '94603', '94621', '94566', '95136', '95111', '94588', '94502', '95121',
      '94066', '95006', '94083', '94605', '95148', '94568', '95127', '95033', '94060', '94080',
      '94038', '94037', '95123', '95044', '95026', '94044', '94613', '94583', '94601', '94005',
      '94619', '94501', '94014', '94124', '94606', '94582', '94188', '94134', '95120', '95119',
      '95007', '94602', '94015', '95140', '95005', '94617', '94016', '94610', '94604', '94614',
      '94620', '94622', '94623', '94624', '94649', '94659', '94660', '94661', '94666', '94112',
      '95139', '94612', '94526', '95042', '94017', '95135', '95138', '94110', '94615', '94107',
      '94143', '94570', '94575', '95018', '94516', '94158', '94607', '94556', '94127', '95013',
      '94131', '94611', '94550', '95060', '94506', '94132', '94114', '94103', '94609', '94105',
      '94119', '94120', '94125', '94126', '94137', '94139', '94140', '94141', '94142', '94144',
      '94145', '94146', '94147', '94151', '94159', '94160', '94161', '94163', '94164', '94172',
      '94177', '94662', '95066', '94102', '94618', '94104', '94608', '94117', '94108', '94528',
      '94111', '94116', '95017', '94507', '94563', '95041', '95141', '94130', '94115', '94109',
      '94595', '94705', '94133', '94551', '94122', '94118', '94704', '94123', '94703', '94702',
      '94720', '94701', '94712', '94549', '94129', '94709', '94121', '95065', '94710', '94596',
      '95073', '94706', '94598', '94708', '94707', '95064', '94597', '94850', '94517', '94530',
      '95037', '95061', '95063', '95067', '95003', '94966', '95038', '94523', '95062', '94804',
      '95010', '94518', '94920', '94965', '94805', '94802', '94808', '94807', '95001', '95391',
      '94553', '94803', '94514', '94521', '94522', '94524', '94527', '94529', '94801', '94820',
      '94513', '94519', '94806', '95377', '95046', '94520', '94564', '94925', '94941', '94942',
      '94547', '94974', '94964', '94531', '94976', '94565', '94939', '94977', '94572', '94509',
      '95019', '94569', '94904', '94505', '94901', '94525', '95076', '94912', '94913', '94914',
      '94915', '94957', '95304', '95376', '95020', '95077', '95378', '94979', '94970', '95021',
      '94561', '94510', '94548', '94978', '94590', '94960', '94930', '94903', '94924', '94591',
      '95387', '94973', '95039', '94589', '94592', '94949', '94963', '95004', '94512', '94933',
      '94585', '94511', '95385', '94938', '95234', '95330', '94946', '94998', '94948', '95012',
      '95360', '95206', '94503', '95337', '95363', '94945', '94956', '94534', '95045', '94947',
      '95219', '94950', '95231', '93907', '94571', '95203', '95208', '94559', '95204', '95358',
      '95641', '93933', '95211', '94533', '95267', '95269', '95296', '95297', '95201', '94535',
      '95202', '95336', '93906', '95476', '95207', '95024', '94954', '95366', '95205', '95213',
      '95209', '94581', '95487', '93955', '93950', '95368', '95210', '93902', '93912', '93915',
      '95313', '94999', '94953', '94975', '93942', '94955', '95242', '93953', '95690', '93901',
      '93905', '93943', '95686', '95433', '95356', '95680'
    ];

    const insertZipcodesMany = database.transaction((zipcodes) => {
      for (const zipcode of zipcodes) {
        insertZipcode.run(zipcode);
      }
    });

    insertZipcodesMany(serviceAreaZipcodes);
    console.log('Database initialized with service area zipcodes');
  }
}

// Category interface
export interface Category {
  id: number;
  name: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

// Database operations for categories
export const categoryDb = {
  // Get all categories
  getAll: (): Category[] => {
    const database = getDatabase();
    const stmt = database.prepare('SELECT * FROM categories ORDER BY id');
    return stmt.all() as Category[];
  },

  // Get category by ID
  getById: (id: number): Category | undefined => {
    const database = getDatabase();
    const stmt = database.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id) as Category | undefined;
  },

  // Insert a new category
  insert: (name: string, image: string): Category => {
    const database = getDatabase();
    const stmt = database.prepare('INSERT INTO categories (name, image) VALUES (?, ?)');
    const result = stmt.run(name, image);

    const newCategory = categoryDb.getById(result.lastInsertRowid as number);
    if (!newCategory) {
      throw new Error('Failed to retrieve created category');
    }
    return newCategory;
  },

  // Update a category
  update: (id: number, name: string, image: string): Category | undefined => {
    const database = getDatabase();
    const stmt = database.prepare('UPDATE categories SET name = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(name, image, id);
    return categoryDb.getById(id);
  },

  // Delete a category
  delete: (id: number): boolean => {
    const database = getDatabase();
    const stmt = database.prepare('DELETE FROM categories WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
};

// Database operations for zipcodes
export const zipcodeDb = {
  // Check if a zipcode is in the service area
  // O(log n) worst case, O(1) average case due to PRIMARY KEY index
  isInServiceArea: (zipcode: string): boolean => {
    const database = getDatabase();
    // Using SELECT 1 with LIMIT 1 stops as soon as a match is found (more efficient than COUNT)
    const stmt = database.prepare('SELECT 1 FROM zipcodes WHERE zipcode = ? LIMIT 1');
    const result = stmt.get(zipcode);
    return result !== undefined;
  }
};

export default getDatabase;

