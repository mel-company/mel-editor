import { twind, virtual } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';
import fs from 'fs';
import path from 'path';

// Scan template files and extract all Tailwind classes
function extractClassesFromTemplates(): Set<string> {
  const classes = new Set<string>();
  const templateDir = path.resolve(process.cwd(), 'templates');

  // Recursively find all .tsx files in templates directory
  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        extractFromFile(fullPath);
      }
    }
  }

  // Extract classes from a single file
  function extractFromFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Match className="..." and className={`...`} and className={classNames(...)}
    const patterns = [
      /className="([^"]+)"/g,
      /className={`([^`]+)`}/g,
      /className='([^']+)'/g,
      // Also catch classes in template literals and string concatenations
      /"([a-z][a-z0-9-:\/\[\]]+(?:\s+[a-z][a-z0-9-:\/\[\]]+)*)"/g,
      /'([a-z][a-z0-9-:\/\[\]]+(?:\s+[a-z][a-z0-9-:\/\[\]]+)*)'/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const classString = match[1];
        // Split by whitespace and filter valid Tailwind-like classes
        const classList = classString.split(/\s+/).filter(c =>
          c && /^-?[a-z]/.test(c) && !c.includes('${') && !c.includes('(')
        );
        classList.forEach(c => classes.add(c));
      }
    }
  }

  scanDir(templateDir);

  console.log(`[StyleGenerator] Extracted ${classes.size} unique classes from templates`);
  return classes;
}

export const generateStyles = async (storeSettings: any): Promise<string> => {
  const colors = storeSettings.colors || {};
  const fonts = storeSettings.fonts || {};

  // Extract classes from actual template files
  const templateClasses = extractClassesFromTemplates();

  // Create a virtual sheet to collect CSS
  const sheet = virtual();

  // Initialize Twind with Tailwind preset
  const tw = twind({
    presets: [presetAutoprefix(), presetTailwind()],
    theme: {
      extend: {
        colors: {
          primary: colors.primary || '#4272FF',
          secondary: colors.secondary || '#ACBA12',
        },
      },
    },
  }, sheet);

  // Process all extracted classes to generate CSS
  templateClasses.forEach(className => {
    try {
      tw(className);
    } catch (e) {
      // Skip invalid classes silently
    }
  });

  // Get the generated CSS from the virtual sheet (minified - no newlines)
  const generatedCSS = sheet.target.join('');

  // Build final CSS with variables + generated utilities
  const css = `:root{--primary-color:${colors.primary || '#4272FF'};--secondary-color:${colors.secondary || '#ACBA12'};--text-color:${colors.text || '#1D293D'};--heading-font:${fonts.heading || 'sans-serif'};--body-font:${fonts.body || 'sans-serif'}}*,*::before,*::after{box-sizing:border-box}body{margin:0;font-family:var(--body-font),ui-sans-serif,system-ui,sans-serif;color:var(--text-color);line-height:1.5;-webkit-font-smoothing:antialiased}h1,h2,h3,h4,h5,h6{font-family:var(--heading-font),ui-sans-serif,system-ui,sans-serif;color:var(--text-color)}img,video{max-width:100%;height:auto}${generatedCSS}`;

  return css;
};
