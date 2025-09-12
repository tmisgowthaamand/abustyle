/**
 * Image utility functions for handling product images
 */

/**
 * Get the base path for product images
 * @param category - Product category (e.g., 'cosmetics', 'toys')
 * @param productId - Product ID or slug (will be converted to kebab-case)
 * @returns Base path for the product's images
 */
export function getProductImageBasePath(category: string, productId: string): string {
  // Convert product ID to kebab-case if it's not already
  const slug = productId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  return `/images/products/${category}/${slug}`;
}

/**
 * Get the full path to a product image
 * @param category - Product category
 * @param productId - Product ID or slug
 * @param imageName - Image filename (e.g., '1.jpg' or 'main.jpg')
 * @returns Full path to the product image
 */
export function getProductImagePath(
  category: string,
  productId: string,
  imageName: string
): string {
  const basePath = getProductImageBasePath(category, productId);
  return `${basePath}/${imageName}`;
}

/**
 * Generate image paths for a product
 * @param category - Product category
 * @param productId - Product ID or slug
 * @param count - Number of images to generate paths for
 * @returns Array of image paths
 */
export function generateProductImagePaths(
  category: string,
  productId: string,
  count: number
): string[] {
  const basePath = getProductImageBasePath(category, productId);
  return Array.from({ length: count }, (_, i) => `${basePath}/${i + 1}.jpg`);
}

/**
 * Get placeholder image URL for products without images
 * @param width - Image width
 * @param height - Image height
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(width: number, height: number): string {
  return `https://placehold.co/${width}x${height}/f3f4f6/9ca3af?text=No+Image`;
}

/**
 * Preload images to improve user experience
 * @param imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls: string[]): void {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
