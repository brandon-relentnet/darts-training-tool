import React, { useState, useEffect } from 'react';
import { ALL_THEMES } from '../../config/themes';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Initialize theme-change
    themeChange(false);
    
    // Get current theme from data-theme attribute or localStorage or default to dark
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = htmlTheme || savedTheme || 'dark';
    
    setCurrentTheme(initialTheme);

    // Set up mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  const handleThemeChange = (themeValue) => {
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('theme', themeValue);
    setCurrentTheme(themeValue);
    setIsOpen(false);
  };

  const getThemeDisplayName = (themeValue) => {
    const theme = ALL_THEMES.find(t => t.value === themeValue);
    return theme?.name || themeValue;
  };

  // Get theme colors for preview
  const getThemePreview = (themeValue) => {
    // Color mappings for theme previews
    const themeColors = {
      light: ['#ffffff', '#f3f4f6', '#3b82f6'],
      dark: ['#1f2937', '#374151', '#60a5fa'],
      cupcake: ['#faf7f5', '#e879f9', '#65a30d'],
      bumblebee: ['#fffbeb', '#f59e0b', '#1f2937'],
      emerald: ['#ecfdf5', '#10b981', '#1f2937'],
      corporate: ['#ffffff', '#1e40af', '#64748b'],
      synthwave: ['#1a103d', '#e879f9', '#06ffa5'],
      retro: ['#f6f6f6', '#ef4444', '#eab308'],
      cyberpunk: ['#000000', '#ffff00', '#ff0080'],
      valentine: ['#ffe4e6', '#f43f5e', '#1f2937'],
      halloween: ['#1a1a1a', '#f97316', '#a855f7'],
      garden: ['#f0fdf4', '#22c55e', '#1f2937'],
      forest: ['#171717', '#22c55e', '#a3a3a3'],
      aqua: ['#f0fdfa', '#06b6d4', '#1f2937'],
      lofi: ['#1a1a1a', '#a3a3a3', '#d4d4d8'],
      pastel: ['#fdf4ff', '#d946ef', '#64748b'],
      fantasy: ['#f3e8ff', '#8b5cf6', '#1f2937'],
      wireframe: ['#ffffff', '#000000', '#6b7280'],
      black: ['#000000', '#404040', '#a3a3a3'],
      luxury: ['#09090b', '#d4af37', '#ffffff'],
      dracula: ['#282a36', '#bd93f9', '#50fa7b'],
      cmyk: ['#ffffff', '#0ea5e9', '#ec4899'],
      autumn: ['#fef3c7', '#f59e0b', '#dc2626'],
      business: ['#1f2937', '#3b82f6', '#e5e7eb'],
      acid: ['#000000', '#00ff00', '#ff00ff'],
      lemonade: ['#fffbeb', '#eab308', '#1f2937'],
      night: ['#0f172a', '#3b82f6', '#94a3b8'],
      coffee: ['#1c1917', '#92400e', '#d4d4aa'],
      winter: ['#f8fafc', '#0ea5e9', '#1e293b'],
      dim: ['#2a2e37', '#9ca3af', '#a3a3a3'],
      nord: ['#2e3440', '#88c0d0', '#d8dee9'],
      sunset: ['#1a202c', '#f56565', '#ed8936'],
      caramellatte: ['#f7f3f0', '#d2691e', '#8b4513'],
      abyss: ['#000000', '#4c1d95', '#7c3aed'],
      silk: ['#f8f9fa', '#6c757d', '#495057']
    };
    
    return themeColors[themeValue] || ['#ffffff', '#000000', '#6b7280'];
  };

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="tooltip-bottom btn btn-ghost btn-circle tooltip"
        data-tip={`Theme: ${getThemeDisplayName(currentTheme)}`}
      >
        <div className="border-2 border-base-content/20 rounded-full w-5 h-5 overflow-hidden">
          <div className="flex w-full h-full">
            {getThemePreview(currentTheme).map((color, i) => (
              <div 
                key={i} 
                className="flex-1 h-full" 
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div 
        tabIndex={0} 
        className="z-[1] bg-base-100 shadow-2xl p-6 rounded-box w-96 dropdown-content"
      >
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-bold text-lg">Choose Theme</h3>
            <p className="opacity-70 text-sm">Current: {getThemeDisplayName(currentTheme)}</p>
          </div>

          <div className="gap-3 grid grid-cols-6">
            {ALL_THEMES.map(theme => {
              const colors = getThemePreview(theme.value);
              return (
                <button
                  key={theme.value}
                  className={`tooltip relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    currentTheme === theme.value 
                      ? 'border-primary border-4 shadow-lg' 
                      : 'border-base-content/10 hover:border-base-content/30'
                  }`}
                  data-set-theme={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                  data-tip={theme.name}
                >
                  <div className="flex flex-col w-full aspect-square">
                    <div className="flex flex-1">
                      {colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="flex-1" 
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {currentTheme === theme.value && (
                    <div className="top-1 right-1 absolute">
                      <div className="flex justify-center items-center bg-primary rounded-full w-3 h-3">
                        <svg className="w-2 h-2 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;