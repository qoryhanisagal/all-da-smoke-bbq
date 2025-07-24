import { Link } from 'react-router-dom';

// Map category names to URL slugs
const categorySlugMap = {
  'SIGNATURE BBQ': 'signature-bbq',
  'BBQ SANDWICHES': 'bbq-sandwiches', 
  'PITMASTER LUNCH PLATES': 'lunch-plates',
  'BBQ BY THE POUND': 'bbq-by-pound',
  'FAMILY MEALS': 'family-meals',
  'FRESH BITES': 'fresh-bites',
  'PITMASTER PICKS': 'pitmaster-picks',
  'SIDEKICKS': 'sides',
  'DESSERTS': 'desserts',
  'BEVERAGES': 'beverages',
  'SAUCES & RUBS': 'sauces-rubs'
};

const CategoryHeader = ({ title, description }) => {
  const categorySlug = categorySlugMap[title];
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-stardos-stencil-bold text-left">
          {title}
        </h2>
        {categorySlug && (
          <Link 
            to={`/menu/${categorySlug}`}
            className="btn btn-primary btn-sm mt-2 shrink-0 ml-4"
          >
            View All
            <i className="bi bi-arrow-right ml-1"></i>
          </Link>
        )}
      </div>
      {description && (
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 font-stardos-stencil-normal text-left">
          {description}
        </p>
      )}
    </div>
  );
};

export default CategoryHeader;
