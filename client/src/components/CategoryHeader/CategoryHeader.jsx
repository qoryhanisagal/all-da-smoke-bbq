const CategoryHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-stardos-stencil-bold mb-2 text-left">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 font-stardos-stencil-normal text-left">
          {description}
        </p>
      )}
    </div>
  );
};

export default CategoryHeader;
