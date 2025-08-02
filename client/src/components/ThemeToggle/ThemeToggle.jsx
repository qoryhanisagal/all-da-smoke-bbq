import { useEffect, useState } from 'react';

// Theme constants
const THEMES = {
  DARK: 'black',
  LIGHT: 'lofi'
};

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(THEMES.DARK);

  // Get stored theme from localStorage
  const getStoredTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ads-theme') || THEMES.DARK;
    }
    return THEMES.DARK;
  };

  // Set theme in localStorage and DOM
  const setStoredTheme = (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ads-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  };


  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setStoredTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    setStoredTheme(storedTheme);
    setCurrentTheme(storedTheme);
  }, []);

  return (
    <div className="flex items-center">
      <label className="swap swap-rotate cursor-pointer">
        <input
          type="checkbox"
          checked={currentTheme === THEMES.LIGHT}
          onChange={toggleTheme}
          className="theme-controller"
        />
        
        {/* Sun icon (shown when dark theme is active) */}
        <i className="swap-off bi bi-sun text-xl"></i>
        
        {/* Moon icon (shown when light theme is active) */}
        <i className="swap-on bi bi-moon text-xl"></i>
      </label>
    </div>
  );
}