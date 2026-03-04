/// <reference types="vite/client" />

import JSZip from 'jszip';
import { saveAs } from 'file-saver';


// Use import.meta.glob to eagerly load all source files as raw text
// This allows us to bundle the actual source code of the components
const componentFiles = import.meta.glob('@templates/sections/**/*.{tsx,ts,css}', { as: 'raw', eager: true });
const uiFiles = import.meta.glob('../components/ui/**/*.{tsx,ts,css}', { as: 'raw', eager: true });
const utilFiles = import.meta.glob('./**/*.{tsx,ts}', { as: 'raw', eager: true });
const hookFiles = import.meta.glob('../hooks/**/*.{tsx,ts}', { as: 'raw', eager: true });
const typeFiles = import.meta.glob('../types/**/*.{tsx,ts}', { as: 'raw', eager: true });
const mockFiles = import.meta.glob('@templates/sections/**/*.{tsx,ts}', { as: 'raw', eager: true });

export const generateProjectZip = async (templateData: any) => {
  const zip = new JSZip();
  const srcFolder = zip.folder("src");

  // Helper to strip relative prefixes
  const cleanRelPath = (path: string) => {
    // Handle ../ and ../../
    let clean = path;
    while (clean.startsWith('../') || clean.startsWith('./')) {
      clean = clean.replace(/^\.?\.\//, '');
    }
    return clean;
  };

  // 1. Add Component Source Files (Templates)
  Object.entries(componentFiles).forEach(([path, content]) => {
    // path is like "@templates/sections/page/home/hero.tsx"
    // we want "templates/sections/page/home/hero.tsx"
    const relPath = cleanRelPath(path);
    srcFolder?.file(relPath, content as string);
  });

  Object.entries(uiFiles).forEach(([path, content]) => {
    // path: "../components/ui/..." -> "components/ui/..."
    const relPath = cleanRelPath(path);
    srcFolder?.file(relPath, content as string);
  });

  Object.entries(utilFiles).forEach(([path, content]) => {
    // path: "./json-to-code.ts" -> "utils/json-to-code.ts"
    // Here we explicitly want strict utilities structure or flat?
    // Original: const relPath = path.startsWith('./') ? `utils/${path.slice(2)}` : `utils/${path}`;
    let p = path.startsWith('./') ? path.slice(2) : path;
    const relPath = `utils/${p}`;
    srcFolder?.file(relPath, content as string);
  });

  Object.entries(hookFiles).forEach(([path, content]) => {
    const relPath = cleanRelPath(path);
    srcFolder?.file(relPath, content as string);
  });

  Object.entries(typeFiles).forEach(([path, content]) => {
    const relPath = cleanRelPath(path);
    srcFolder?.file(relPath, content as string);
  });

  Object.entries(mockFiles).forEach(([path, content]) => {
    const relPath = cleanRelPath(path);
    srcFolder?.file(relPath, content as string);
  });

  // 2. Create App.tsx from template data
  const appContent = generateAppFile(templateData);
  srcFolder?.file("App.tsx", appContent);

  // 3. Add Entry Point (main.tsx)
  srcFolder?.file("main.tsx", `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

  // 4. Add CSS
  srcFolder?.file("index.css", `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
`);

  // 5. Add Configuration Files
  zip.file("package.json", JSON.stringify({
    name: "my-generated-project",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    dependencies: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "lucide-react": "^0.263.1",
      "clsx": "^2.0.0",
      "tailwind-merge": "^1.14.0",
      "framer-motion": "^10.16.4"
    },
    devDependencies: {
      "@types/react": "^18.2.15",
      "@types/react-dom": "^18.2.7",
      "@vitejs/plugin-react": "^4.0.3",
      "typescript": "^5.0.2",
      "vite": "^4.4.5",
      "autoprefixer": "^10.4.14",
      "postcss": "^8.4.27",
      "tailwindcss": "^3.3.3"
    }
  }, null, 2));

  zip.file("vite.config.ts", `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`);

  zip.file("tsconfig.json", JSON.stringify({
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "unusedLocals": true,
      "unusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }, null, 2));

  zip.file("tsconfig.node.json", JSON.stringify({
    "compilerOptions": {
      "composite": true,
      "skipLibCheck": true,
      "module": "ESNext",
      "moduleResolution": "bundler",
      "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
  }, null, 2));

  zip.file("index.html", `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Generated Site</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

  // 6. Generate content description
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "my-vite-project.zip");
};

function generateAppFile(templateData: any) {
  const { pages, storeSettings } = templateData;
  const sections = pages?.[0]?.sections || [];

  return `
import React from 'react';
// Imports adjusted to new structure
import { Navigation1 } from './templates/sections/page/home/production/navbar';
import { HeroSection1 } from './templates/sections/page/home/production/hero';

// NOTE: This is a generated file. 
// You would need to wire up the actual component imports based on 'templateData'
// or copy the 'RenderTemplate' logic into this project.

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation1 />
      
      {/* Sections */}
      <main>
         {/* Dynamic mapping would go here */}
         <HeroSection1 />
         <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">Project Generated!</h1>
            <p>Modify App.tsx to import your specific sections.</p>
         </div>
      </main>
      
      {/* Footer */}
    </div>
  )
}
`;
}
