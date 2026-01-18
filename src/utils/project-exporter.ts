/// <reference types="vite/client" />

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateCodeFromJSON } from './json-to-code';
import { reactToJSON } from './react-to-json';

// Use import.meta.glob to eagerly load all source files as raw text
// This allows us to bundle the actual source code of the components
const componentFiles = import.meta.glob('../global-sections/**/*.{tsx,ts,css}', { as: 'raw', eager: true });
const uiFiles = import.meta.glob('../components/ui/**/*.{tsx,ts,css}', { as: 'raw', eager: true });
const utilFiles = import.meta.glob('./**/*.{tsx,ts}', { as: 'raw', eager: true });
const hookFiles = import.meta.glob('../hooks/**/*.{tsx,ts}', { as: 'raw', eager: true });
const typeFiles = import.meta.glob('../types/**/*.{tsx,ts}', { as: 'raw', eager: true });
const mockFiles = import.meta.glob('../mock/**/*.{tsx,ts}', { as: 'raw', eager: true });

// Helper to clean file paths for the zip structure
const cleanPath = (path: string, prefixToRemove: string) => {
    return path.replace(prefixToRemove, '');
};

export const generateProjectZip = async (templateData: any) => {
    const zip = new JSZip();
    const srcFolder = zip.folder("src");

    // 1. Add Component Source Files
    Object.entries(componentFiles).forEach(([path, content]) => {
        // path is like "../global-sections/page/home/hero.tsx"
        // we want "src/global-sections/page/home/hero.tsx"
        const relPath = path.replace('../', '');
        srcFolder?.file(relPath, content as string);
    });

    Object.entries(uiFiles).forEach(([path, content]) => {
        const relPath = path.replace('../', '');
        srcFolder?.file(relPath, content as string);
    });

    Object.entries(utilFiles).forEach(([path, content]) => {
        // path is like "./json-to-code.ts" -> "utils/json-to-code.ts"
        const relPath = path.startsWith('./') ? `utils/${path.slice(2)}` : `utils/${path}`;
        srcFolder?.file(relPath, content as string);
    });

    Object.entries(hookFiles).forEach(([path, content]) => {
        const relPath = path.replace('../', '');
        srcFolder?.file(relPath, content as string);
    });

    Object.entries(typeFiles).forEach(([path, content]) => {
        const relPath = path.replace('../', '');
        srcFolder?.file(relPath, content as string);
    });

    Object.entries(mockFiles).forEach(([path, content]) => {
        const relPath = path.replace('../', '');
        srcFolder?.file(relPath, content as string);
    });

    // 2. Create App.tsx from template data
    // We need to convert the current sections/state into a React component string
    // This is a simplified version - in a real app you might need a more robust AST generator
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
            "framer-motion": "^10.16.4" // Assuming this might be used
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

// Simplified App generator
// In a real scenario, you'd reuse your RenderTemplate logic but adapted for static generation
function generateAppFile(templateData: any) {
    const { pages, storeSettings } = templateData;

    // Default to the first page's sections if available, or empty array
    const sections = pages?.[0]?.sections || [];

    // We need to map the section types to imports
    // This is a heuristic - in production you'd want a strict map
    const imports = new Set<string>();

    const sectionsCode = sections.map((section: any) => {
        // Guess the import based on section type or component name
        // This relies on the 'type' field matching the file structure or component name
        // For now, let's look at the mapping logic in 'use-template-structure'

        // This is tricky without a direct mapping map available here.
        // But we bundled all files. 
        // Let's assume the user wants the JSON structure and we'll use a dynamic renderer in the generated app too?
        // OR we try to statically stringify it.

        return `{/* Section: ${section.type} */}`;
    }).join('\n');

    // To make this robust, let's create a 'RenderEngine' in the exported project 
    // that operates exactly like the editor's renderer, but reads from a local config.
    // So 'App.tsx' just sets up the provider and calls <RenderTemplate />

    return `
import React from 'react';
// import RenderTemplate from './components/editor/render'; // We need to ensure we export this component
// Or simpler: Re-implement a basic renderer here if the editor one is too complex with Zustand
// For now, let's output a placeholder that shows the structure is ready
import { Navigation1 } from './global-sections/page/home/production/navbar';
import { HeroSection1 } from './global-sections/page/home/production/hero';

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
