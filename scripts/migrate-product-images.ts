import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '../src/types/product';
import { getProductImagePath, generateProductImagePaths } from '../src/lib/image-utils';

// Path to your product data files
const PRODUCT_DATA_DIR = path.join(__dirname, '../src/lib/mockData');
const CATEGORIES = ['cosmetics', 'toys', 'accessories', 'bags'] as const;

async function migrateImages() {
  for (const category of CATEGORIES) {
    const filePath = path.join(PRODUCT_DATA_DIR, `${category}.ts`);
    
    try {
      // Read the file
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Find the products array
      const productsMatch = content.match(/const \w+: Product\[\] = \[([\s\S]*?)\]/);
      if (!productsMatch) {
        console.warn(`No products array found in ${filePath}`);
        continue;
      }
      
      // Extract and parse the products
      const productsCode = `[${productsMatch[1]}]`;
      const products: Product[] = eval(productsCode);
      
      // Update each product's image paths
      const updatedProducts = products.map(product => {
        // Skip if already migrated
        if (product.image.startsWith('/images/products/')) {
          return product;
        }
        
        // Generate new image paths
        const imageCount = Math.min(4, product.images?.length || 1);
        const newImages = generateProductImagePaths(category, product.id, imageCount);
        
        return {
          ...product,
          image: newImages[0],
          images: newImages
        };
      });
      
      // Generate the new products array code
      const newProductsCode = `const ${category}Products: Product[] = [
${updatedProducts.map(p => JSON.stringify(p, null, 2)).join(',\n')}
];`;
      
      // Replace the old products array with the new one
      content = content.replace(
        /const \w+: Product\[\] = \[[\s\S]*?\];/,
        newProductsCode
      );
      
      // Write the updated file
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`Updated ${category} products with new image paths`);
      
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }
  
  console.log('Migration completed!');
}

// Run the migration
migrateImages().catch(console.error);
