/**
 * Converts a category name to a URL-friendly slug
 */
export function categoryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Converts a URL slug back to a category name
 */
export function slugToCategoryName(slug: string): string {
  // Map of slugs to proper category names
  const slugMap: Record<string, string> = {
    'zebra-shades': 'Zebra Shades',
    'honeycomb-shades': 'Honeycomb Shades',
    'roller-shades': 'Roller Shades',
    'shangri-la-shades': 'Shangri-La Shades',
    'roman-shades': 'Roman Shades',
    'bamboo-shades': 'Bamboo Shades',
    'draperies': 'Draperies',
    'outdoor-shades': 'Outdoor Shades',
    'dream-shades': 'Dream Shades',
  }

  return slugMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

