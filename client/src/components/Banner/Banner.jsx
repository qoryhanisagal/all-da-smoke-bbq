import { useEffect } from 'react';
import { initTheme, toggleTheme, getStoredTheme, THEMES } from '../../utils/themeManager';

const TopBanner = () => {
  useEffect(() => {
    initTheme();
  }, []);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <div className="w-full bg-gradient-to-bl from-accent via-secondary to-primary text-base-content text-sm px-0 py-0 overflow-x-hidden">
      <div className="flex justify-evenly items-center gap-x-1 w-full px-0">
        {/* Social Icons */}
        <div className="pl-4 pr-6 py-2 flex items-center space-x-3 text-primary-content">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-youtube"></i>
        </div>

        {/* Location */}
        <div className="flex-1 flex justify-center items-center space-x-1 text-primary-content">
          <i className="bi bi-geo-alt-fill text-primary-content"></i>
          <span>Victorville, California 92392</span>
        </div>

        {/* Phone Icon with number */}
        <div className="flex-1 flex justify-center items-center space-x-1 text-sm">
          <i className="bi bi-telephone text-primary-content"></i>
          <span className="text-xs font-semibold text-primary-content">
            +1 (760) 885–7425
          </span>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2 me-2 text-primary-content">
          <label className="swap swap-rotate">
            <input 
              type="checkbox" 
              className="theme-controller" 
              value="lofi"
              onChange={handleThemeToggle}
            />
            {/* sun icon */}
            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2v2m0 16v2m8.485-8.485l-1.414 1.414M4.929 4.929l1.414 1.414M22 12h-2M4 12H2m16.071 7.071l-1.414-1.414M4.929 19.071l1.414-1.414M12 18a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
            {/* moon icon */}
            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </label>
        </div>

        {/* Login / Register */}
        <div className="flex items-center space-x-2 me-4 text-primary-content">
          <i className="bi bi-person-circle text-primary-content"></i>
          <a href="#" className="hover:underline">
            Login or Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
