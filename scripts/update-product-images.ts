import fs from 'fs';
import path from 'path';
import { ProductCategory } from '../src/types/product';

// Define the directory where product data files are stored
const DATA_DIR = path.join(__dirname, '../src/lib/mockData');

// Categories to process
const CATEGORIES: ProductCategory[] = ['cosmetics', 'toys', 'accessories', 'bags'];

// Helper function to generate image paths
function generateImagePaths(category: string, productId: string, count: number): string[] {
  const basePath = `/images/products/${category}`;
  const slug = productId.toLowerCase().replace(/\s+/g, '-');
  
  return Array.from({ length: count }, (_, i) => 
    `${basePath}/${slug}/${i + 1}.jpg`
  );
}

// Process each category
CATEGORIES.forEach(category => {
  const filePath = path.join(DATA_DIR, `${category}.ts`);
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find and update each product's image paths
    content = content.replace(
      /(const\s+\w+\s*=\s*\{\s*id:\s*['"]([^'"]+)['"],\s*[^}]*image:\s*['"]([^'"]*)['"])/g,
      (match, fullMatch, productId) => {
        // Generate new image paths (3 images per product)
        const imagePaths = generateImagePaths(category, productId, 3);
        
        // Create the updated product object
        return `const ${productId} = {
          id: '${productId}',
          category: '${category}',
          image: '${imagePaths[0]}',
          images: ${JSON.stringify(imagePaths)},`;
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated ${category} products with new image paths`);
    
  } catch (error) {
    console.error(`❌ Error processing ${category}:`, error);
  }
});

console.log('🎉 Image path update completed!');
