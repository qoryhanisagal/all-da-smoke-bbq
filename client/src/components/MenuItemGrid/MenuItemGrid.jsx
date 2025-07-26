import { Link } from 'react-router-dom';

const MenuItemGrid = ({ items, category }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <i className="bi bi-search text-6xl text-base-content/30 mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">No Items Found</h3>
        <p className="text-base-content/70">This category doesn't have any items yet.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <figure className="relative">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            {item.popular && (
              <div className="badge badge-primary badge-lg absolute top-4 right-4">
                <i className="bi bi-star-fill mr-1"></i>
                Popular
              </div>
            )}
          </figure>
          
          <div className="card-body">
            <h3 className="card-title text-xl">{item.name}</h3>
            <p className="text-base-content/70 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-2xl font-bold text-primary">{item.price}</span>
              <div className="card-actions">
                <Link 
                  to={`/menu/${category}/${item.id}`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-eye mr-1"></i>
                  View Details
                </Link>
                <button className="btn btn-outline btn-sm">
                  <i className="bi bi-cart-plus mr-1"></i>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemGrid;