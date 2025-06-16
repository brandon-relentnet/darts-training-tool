// DaisyUI theme configuration
export const THEME_CATEGORIES = {
  light: {
    name: "Light Themes",
    themes: [
      { value: "light", name: "Light", description: "Default light theme" },
      { value: "cupcake", name: "Cupcake", description: "Soft pastels" },
      { value: "bumblebee", name: "Bumblebee", description: "Yellow accent" },
      { value: "emerald", name: "Emerald", description: "Green focus" },
      { value: "corporate", name: "Corporate", description: "Professional blue" },
      { value: "retro", name: "Retro", description: "Vintage vibes" },
      { value: "valentine", name: "Valentine", description: "Pink romance" },
      { value: "garden", name: "Garden", description: "Nature green" },
      { value: "aqua", name: "Aqua", description: "Ocean blue" },
      { value: "lofi", name: "Lo-fi", description: "Calm pastels" },
      { value: "pastel", name: "Pastel", description: "Soft colors" },
      { value: "fantasy", name: "Fantasy", description: "Purple magic" },
      { value: "wireframe", name: "Wireframe", description: "Minimal design" },
      { value: "cmyk", name: "CMYK", description: "Print colors" },
      { value: "autumn", name: "Autumn", description: "Warm oranges" },
      { value: "acid", name: "Acid", description: "Bright neon" },
      { value: "lemonade", name: "Lemonade", description: "Fresh yellow" },
      { value: "winter", name: "Winter", description: "Cool blues" },
      { value: "nord", name: "Nord", description: "Arctic palette" }
    ]
  },
  dark: {
    name: "Dark Themes",
    themes: [
      { value: "dark", name: "Dark", description: "Default dark theme" },
      { value: "synthwave", name: "Synthwave", description: "80s neon" },
      { value: "cyberpunk", name: "Cyberpunk", description: "Futuristic yellow" },
      { value: "halloween", name: "Halloween", description: "Spooky orange" },
      { value: "forest", name: "Forest", description: "Deep green" },
      { value: "black", name: "Black", description: "Pure darkness" },
      { value: "luxury", name: "Luxury", description: "Gold accents" },
      { value: "dracula", name: "Dracula", description: "Purple vampire" },
      { value: "business", name: "Business", description: "Professional dark" },
      { value: "night", name: "Night", description: "Deep blue" },
      { value: "coffee", name: "Coffee", description: "Brown warmth" },
      { value: "dim", name: "Dim", description: "Muted dark" },
      { value: "sunset", name: "Sunset", description: "Orange glow" }
    ]
  },
  special: {
    name: "Special Themes",
    themes: [
      { value: "caramellatte", name: "Caramel Latte", description: "Coffee shop" },
      { value: "abyss", name: "Abyss", description: "Deep space" },
      { value: "silk", name: "Silk", description: "Smooth elegance" }
    ]
  }
};

// Flat list of all themes for easy access
export const ALL_THEMES = Object.values(THEME_CATEGORIES)
  .flatMap(category => category.themes);

// Popular themes for quick access
export const POPULAR_THEMES = [
  "light", "dark", "cupcake", "synthwave", "retro", 
  "cyberpunk", "valentine", "dracula", "luxury", "business"
];