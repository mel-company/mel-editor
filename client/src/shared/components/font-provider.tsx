// Font Provider Component - Wraps content and loads fonts dynamically
// Uses lazy loading to only load fonts when needed

import React, { useEffect } from 'react';
import { useFontLoader } from '../../utils/font-loader';

interface FontProviderProps {
  headingFont?: string;
  bodyFont?: string;
  children: React.ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({
  headingFont,
  bodyFont,
  children,
}) => {
  // Load both fonts dynamically
  const { isLoaded: headingLoaded } = useFontLoader(headingFont);
  const { isLoaded: bodyLoaded } = useFontLoader(bodyFont);

  const isReady = headingLoaded && bodyLoaded;

  // Apply fonts via CSS variables when loaded
  useEffect(() => {
    if (isReady) {
      const root = document.documentElement;
      if (headingFont) {
        root.style.setProperty('--heading-font', headingFont);
      }
      if (bodyFont) {
        root.style.setProperty('--body-font', bodyFont);
      }
    }
  }, [isReady, headingFont, bodyFont]);

  // Add fallback styles during loading
  const fontStyles: React.CSSProperties = {
    fontFamily: bodyFont || 'IBM Plex Sans Arabic, sans-serif',
    opacity: isReady ? 1 : 0.9,
    transition: 'opacity 0.2s ease-out',
  };

  return (
    <div style={fontStyles}>
      {children}
    </div>
  );
};

export default FontProvider;
