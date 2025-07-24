import categories from '../../data/categories';

const CategoryTabs = ({ selected, onChange }) => {
  const handleCategoryClick = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-stardos-stencil-bold text-base-content tracking-wider">
          JUMP TO A CATEGORY
        </h2>
      </div>

      {/* Category List */}
      <div className="space-y-0">
        {categories.map(({ name, description }) => (
          <button
            key={name}
            className={`w-full text-left px-6 py-4 border-l-4 font-stardos-stencil-bold text-sm tracking-wider transition-all duration-150 ${
              selected === name
                ? 'border-primary bg-primary text-primary-content'
                : 'border-base-300 bg-base-100 text-base-content hover:bg-base-200 hover:border-base-300'
            }`}
            onClick={() => handleCategoryClick(name)}
            title={description} // Show description on hover
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
