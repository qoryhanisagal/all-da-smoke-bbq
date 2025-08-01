// Theme management utility for All Da Smoke BBQ
export const THEMES = {
  DARK: 'black',
  LIGHT: 'lofi'
};

export const getStoredTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ads-theme') || THEMES.DARK;
  }
  return THEMES.DARK;
};

export const setStoredTheme = (theme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ads-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
};

export const initTheme = () => {
  const storedTheme = getStoredTheme();
  setStoredTheme(storedTheme);
  
  // Set the theme controller checkbox
  const themeController = document.querySelector('.theme-controller');
  if (themeController) {
    themeController.checked = storedTheme === THEMES.LIGHT;
  }
};

export const toggleTheme = () => {
  const currentTheme = getStoredTheme();
  const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  setStoredTheme(newTheme);
  return newTheme;
};