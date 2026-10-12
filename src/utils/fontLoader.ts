// Utility to dynamically load Google Fonts into the DOM
const loadedFonts = new Set<string>();

export function loadGoogleFont(fontName: string): void {
  if (!fontName) return;
  const cleanName = fontName.trim();
  if (loadedFonts.has(cleanName)) return;

  try {
    const formattedFamily = cleanName.replace(/\s+/g, '+');
    const href = `https://fonts.googleapis.com/css2?family=${formattedFamily}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap`;
    
    // Check if link tag already exists
    const existing = document.querySelector(`link[href*="${formattedFamily}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
    loadedFonts.add(cleanName);
  } catch (e) {
    console.error('Failed to inject Google Font:', fontName, e);
  }
}

// Relative luminance and contrast ratio calculations for WCAG compliance
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 10) / 10;
  } catch {
    return 4.5;
  }
}

export function getOptimalTextColor(bgColorHex: string): string {
  try {
    const { r, g, b } = hexToRgb(bgColorHex);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 135 ? '#0f172a' : '#ffffff';
  } catch {
    return '#ffffff';
  }
}
