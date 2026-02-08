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
  execSync(
    'npx tailwindcss -c ./client/tailwind.config.cjs -i ./client/src/tailwind.css -o ./client/public/tailwind.css --minify',
    {
      cwd: rootDir,
      stdio: 'inherit'
    }
  );
  console.log('✅ Tailwind CSS built successfully to client/public/tailwind.css');
} catch (error) {
  console.error('❌ Failed to build Tailwind CSS:', error.message);
  process.exit(1);
}
