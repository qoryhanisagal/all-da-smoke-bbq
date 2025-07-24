import MenuCard from '../MenuCard/MenuCard';

const MenuGrid = ({ items, onItemClick, onOrderClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onItemClick={onItemClick}
          onOrderClick={onOrderClick}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
