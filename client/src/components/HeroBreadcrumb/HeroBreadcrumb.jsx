import { Link } from 'react-router-dom';

const HeroBreadcrumb = ({ items, theme = 'dark' }) => {
  // Theme configurations for different hero backgrounds
  const themeStyles = {
    dark: {
      container: 'bg-black/30 backdrop-blur-sm border-white/20',
      text: 'text-white',
      separator: 'text-white/60',
      link: 'text-white/80 hover:text-white',
      current: 'text-white font-medium'
    },
    light: {
      container: 'bg-white/30 backdrop-blur-sm border-black/20',
      text: 'text-black',
      separator: 'text-black/60',
      link: 'text-black/80 hover:text-black',
      current: 'text-black font-medium'
    }
  };

  const styles = themeStyles[theme];

  return (
    <div className="absolute top-4 left-4 z-10">
      <nav 
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${styles.container}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <i className={`bi bi-chevron-right mx-2 text-xs ${styles.separator}`}></i>
                )}
                
                {isLast ? (
                  // Current page - not clickable
                  <span className={`flex items-center ${styles.current}`}>
                    {item.icon && <i className={`${item.icon} mr-1`}></i>}
                    {item.label}
                  </span>
                ) : (
                  // Clickable breadcrumb link
                  <Link 
                    to={item.href} 
                    className={`flex items-center transition-colors duration-200 ${styles.link}`}
                  >
                    {item.icon && <i className={`${item.icon} mr-1`}></i>}
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