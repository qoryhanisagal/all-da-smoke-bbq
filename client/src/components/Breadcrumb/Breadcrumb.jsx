import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumbs text-sm mb-8">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link to={item.href} className="link link-hover inline-flex items-center gap-2">
                {item.icon && <i className={`bi ${item.icon} h-4 w-4`}></i>}
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 opacity-70">
                {item.icon && <i className={`bi ${item.icon} h-4 w-4`}></i>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;