import { Link } from 'react-router-dom';

const HeroBreadcrumb = ({ items, theme = 'dark' }) => {
  // Clean theme configurations - no backgrounds, just text
  const themeStyles = {
    dark: {
      text: 'text-white',
      separator: 'text-white/40',
      link: 'text-white/70 hover:text-white',
      current: 'text-white'
    },
    light: {
      text: 'text-gray-600',
      separator: 'text-gray-400',
      link: 'text-gray-500 hover:text-gray-800',
      current: 'text-gray-800'
    }
  };

  const styles = themeStyles[theme];

  return (
    <div className="absolute top-8 left-6 z-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className={`mx-2 ${styles.separator}`}>/</span>
                )}
                
                {isLast ? (
                  // Current page - not clickable, no icon
                  <span className={`${styles.current} font-medium`}>
                    {item.label}
                  </span>
                ) : (
                  // Clickable breadcrumb link, no icons
                  <Link 
                    to={item.href} 
                    className={`transition-colors duration-200 hover:underline ${styles.link}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default HeroBreadcrumb;