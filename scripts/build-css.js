import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🎨 Building Tailwind CSS...');

// Ensure public directory exists
try {
  mkdirSync(join(rootDir, 'client/public'), { recursive: true });
} catch (err) {
  // Directory already exists
}

try {
  // Create a combined input CSS file that includes both tailwind.css and index.css
  const fs = await import('fs');
  const tailwindInputPath = join(rootDir, 'client/src/tailwind.css');
  const indexPath = join(rootDir, 'client/src/index.css');
  const combinedInputPath = join(rootDir, 'client/src/combined-input.css');

  let combinedContent = '';

  // Read tailwind.css
  if (fs.existsSync(tailwindInputPath)) {
    combinedContent += fs.readFileSync(tailwindInputPath, 'utf-8') + '\n';
  }

  // Read index.css
  if (fs.existsSync(indexPath)) {
    combinedContent += fs.readFileSync(indexPath, 'utf-8') + '\n';
  }

  // Write combined file
  fs.writeFileSync(combinedInputPath, combinedContent);

  execSync(
    `npx tailwindcss -c ./client/tailwind.config.cjs -i ./client/src/combined-input.css -o ./client/public/tailwind.css --minify`,
    {
      cwd: rootDir,
      stdio: 'inherit'
    }
  );

  // Clean up temporary file
  fs.unlinkSync(combinedInputPath);

  console.log('✅ Tailwind CSS built successfully to client/public/tailwind.css');
} catch (error) {
  console.error('❌ Failed to build Tailwind CSS:', error.message);
  process.exit(1);
}
