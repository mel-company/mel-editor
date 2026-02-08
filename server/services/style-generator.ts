import fs from 'fs';
import path from 'path';

export const generateStyles = async (storeSettings: any): Promise<string> => {
  const colors = storeSettings.colors || {};
  const fonts = storeSettings.fonts || {};

  // Read the pre-built Tailwind CSS file
  const tailwindCSSPath = path.resolve(process.cwd(), 'client/public/tailwind.css');
  let tailwindCSS = '';

  if (fs.existsSync(tailwindCSSPath)) {
    tailwindCSS = fs.readFileSync(tailwindCSSPath, 'utf-8');
  }

  // Build final CSS with variables + Tailwind utilities
  const css = `:root{--primary-color:${colors.primary || '#4272FF'};--secondary-color:${colors.secondary || '#ACBA12'};--text-color:${colors.text || '#1D293D'};--heading-font:${fonts.heading || 'sans-serif'};--body-font:${fonts.body || 'sans-serif'}}*,*::before,*::after{box-sizing:border-box}body{margin:0;font-family:var(--body-font),ui-sans-serif,system-ui,sans-serif;color:var(--text-color);line-height:1.5;-webkit-font-smoothing:antialiased}h1,h2,h3,h4,h5,h6{font-family:var(--heading-font),ui-sans-serif,system-ui,sans-serif;color:var(--text-color)}img,video{max-width:100%;height:auto}${tailwindCSS}`;

  return css;
};
