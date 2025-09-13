import fs from 'fs';
import path from 'path';

// Function to fix image paths in mock data files
function fixImagePaths() {
  const mockDataDir = './src/lib/mockData';
  const categories = ['cosmetics', 'toys', 'accessories', 'bags'];
  
  categories.forEach(category => {
    const filePath = path.join(mockDataDir, `${category}.ts`);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace Unsplash URLs with local image paths
      content = content.replace(/https:\/\/images\.unsplash\.com\/[^']+/g, (match, offset) => {
        // Get a random image number between 1-12 for variety
        const imageNum = Math.floor(Math.random() * 12) + 1;
        const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
        return `/images/${categoryCapitalized}/${imageNum}.jpg`;
      });
      
      // Replace any remaining /images/products/ paths
      content = content.replace(/\/images\/products\/([^\/]+)\//g, '/images/$1/'.replace(/([a-z])([A-Z])/g, '$1$2'));
      content = content.replace(/\/images\/cosmetics\//g, '/images/Cosmetics/');
      content = content.replace(/\/images\/toys\//g, '/images/Toys/');
      content = content.replace(/\/images\/accessories\//g, '/images/Accessories/');
      content = content.replace(/\/images\/bags\//g, '/images/Bags/');
      
      // Replace .png with .jpg
      content = content.replace(/\.png/g, '.jpg');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed image paths in ${category}.ts`);
    }
  });
}

fixImagePaths();
console.log('All image paths have been fixed!');
