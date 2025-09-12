# Image Handling System

This document outlines the image handling system for the e-commerce application.

## Directory Structure

All product images are stored in the `public/images/products/` directory with the following structure:

```
public/
  images/
    products/
      {category}/           # e.g., cosmetics, toys, accessories, bags
        {product-slug}/     # Lowercase, hyphen-separated product name or ID
          1.jpg             # Main product image
          2.jpg             # Additional image
          3.jpg             # Additional image
          ...
```

## Image Naming Convention

- Use lowercase letters and hyphens for directory names (e.g., `red-lipstick`)
- Name images sequentially starting from `1.jpg`
- Use `.jpg` format for all product images
- Recommended image size: 1200x1200px for main images, 400x400px for thumbnails

## Data Structure

Each product in the system has the following image-related fields:

```typescript
interface Product {
  // ... other fields
  image: string;          // URL to the main product image
  images: string[];       // Array of all product image URLs
}
```

## Image Gallery Component

The `ImageGallery` component (`src/components/ui/ImageGallery.tsx`) provides a responsive image gallery with the following features:

- Thumbnail navigation
- Fullscreen mode
- Keyboard navigation (left/right arrows, Escape)
- Touch/swipe support for mobile
- Lazy loading for better performance
- Loading states and error handling

## Image Utilities

The `src/lib/image-utils.ts` file provides helper functions for working with product images:

- `getProductImageBasePath(category, productId)`: Gets the base path for a product's images
- `getProductImagePath(category, productId, imageName)`: Gets the full path to a product image
- `generateProductImagePaths(category, productId, count)`: Generates an array of image paths
- `getPlaceholderImage(width, height)`: Gets a placeholder image URL
- `preloadImages(imageUrls)`: Preloads an array of images

## Adding New Products

1. Create a new directory under the appropriate category in `public/images/products/`
2. Name the directory using the product ID in kebab-case (e.g., `red-lipstick`)
3. Add product images named sequentially (1.jpg, 2.jpg, etc.)
4. Update the corresponding product data file in `src/lib/mockData/`

## Best Practices

- Optimize images before uploading (recommended max file size: 200KB per image)
- Use square aspect ratio (1:1) for consistent display
- Include at least 3 images per product (front, back, and detail)
- Use descriptive alt text for accessibility
- Implement lazy loading for images below the fold

## Troubleshooting

- **Images not displaying**: Check the browser console for 404 errors and verify the file paths
- **Slow image loading**: Optimize image sizes and enable compression
- **Blurry images**: Ensure source images are high enough resolution for their display size

## Future Improvements

- Implement image optimization pipeline
- Add support for WebP format with fallbacks
- Implement CDN integration for better performance
- Add image zoom functionality
- Support for product image variants (colors, styles)
