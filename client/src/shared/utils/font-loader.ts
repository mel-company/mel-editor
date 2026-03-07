// Dynamic Font Loader Hook - Loads fonts on demand
import { useEffect, useState } from 'react';

// Font registry with their CSS file paths
const FONT_REGISTRY: Record<string, string> = {
  'IBM Plex Sans Arabic': '', // Already loaded in index.css
  'Bergman Arabic': '/fonts/bergman.css',
  // Add more fonts here as needed
};

// Track which fonts have been loaded
const loadedFonts = new Set<string>();

/**
 * Hook to dynamically load a font when needed
 * @param fontFamily - The font family name to load
 * @returns Object with isLoaded state
 */
export function useFontLoader(fontFamily: string | undefined) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!fontFamily || fontFamily === 'IBM Plex Sans Arabic') {
      setIsLoaded(true);
      return;
    }

    // Check if font is already loaded
    if (loadedFonts.has(fontFamily)) {
      setIsLoaded(true);
      return;
    }

    const cssPath = FONT_REGISTRY[fontFamily];
    if (!cssPath) {
      console.warn(`Font "${fontFamily}" not found in registry`);
      setIsLoaded(true); // Fallback to system font
      return;
    }

    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${cssPath}"]`);
    if (existingLink) {
      loadedFonts.add(fontFamily);
      setIsLoaded(true);
      console.log(`Font already loaded: ${fontFamily}`);
      return;
    }

    // Create link element to load font CSS
    console.log(`Loading font: ${fontFamily} from ${cssPath}`);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    link.onload = () => {
      loadedFonts.add(fontFamily);
      setIsLoaded(true);
      console.log(`Font loaded successfully: ${fontFamily}`);
    };
    link.onerror = (err) => {
      console.error(`Failed to load font: ${fontFamily}`, err);
      setIsLoaded(true); // Continue with fallback
    };

    document.head.appendChild(link);

    return () => {
      // Don't remove the link on unmount - font might be used elsewhere
    };
  }, [fontFamily]);

  return { isLoaded };
}

/**
 * Preload multiple fonts at once
 * @param fontFamilies - Array of font family names to preload
 */
export function preloadFonts(fontFamilies: string[]) {
  console.log('Preloading fonts:', fontFamilies);
  fontFamilies.forEach(fontFamily => {
    if (loadedFonts.has(fontFamily) || fontFamily === 'IBM Plex Sans Arabic') {
      console.log(`Font already loaded or default: ${fontFamily}`);
      return;
    }

    const cssPath = FONT_REGISTRY[fontFamily];
    console.log(`Loading font ${fontFamily} from ${cssPath}`);
    if (!cssPath) {
      console.log(`No CSS path found for font: ${fontFamily}`);
      return;
    }

    const existingLink = document.querySelector(`link[href="${cssPath}"]`);
    if (existingLink) {
      loadedFonts.add(fontFamily);
      console.log(`Font already loaded: ${fontFamily}`);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    link.onload = () => {
      loadedFonts.add(fontFamily);
      console.log(`Font preloaded: ${fontFamily}`);
    };
    link.onerror = (err) => {
      console.error(`Failed to preload font: ${fontFamily}`, err);
    };
    document.head.appendChild(link);
  });
}

// Export font list for use in selectors
export const AVAILABLE_FONTS = Object.keys(FONT_REGISTRY);
