import { useFirebaseMenu } from '../../hooks/useFirebaseMenu';

const CategoryTabs = ({ selected, onChange }) => {
  const { categories } = useFirebaseMenu();
  
  const handleCategoryClick = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Header - Hidden on mobile */}
      <div className="text-center mb-6 hidden lg:block">
        <h2 className="text-lg font-stardos-stencil-bold text-base-content tracking-wider">
          JUMP TO A CATEGORY
        </h2>
      </div>

      {/* Desktop Category List - Vertical layout */}
      <div className="space-y-0 hidden lg:block">
        {categories.map(({ name, description }) => (
          <button
            key={name}
            className={`w-full text-left px-6 py-4 border-l-4 font-stardos-stencil-bold text-sm tracking-wider transition-all duration-150 ${
              selected === name
                ? 'border-primary bg-primary text-primary-content'
                : 'border-base-300 bg-base-100 text-base-content hover:bg-base-200 hover:border-base-300'
            }`}
            onClick={() => handleCategoryClick(name)}
            title={description}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Mobile Category Tabs - Horizontal scrollable layout */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto scrollbar-hide space-x-1 pb-4">
          {categories.map(({ name, description }) => (
            <button
              key={name}
              className={`flex-shrink-0 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-150 whitespace-nowrap ${
                selected === name
                  ? 'bg-primary text-primary-content border-b-2 border-primary'
                  : 'bg-base-200 text-base-content hover:bg-base-300'
              }`}
              onClick={() => handleCategoryClick(name)}
              title={description}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
