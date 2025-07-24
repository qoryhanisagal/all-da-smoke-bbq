import { useParams, Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

// Import actual menu data
import menu from '../../data/menu';
import categories from '../../data/categories';

// Create category data structure from existing menu data
const createCategoryData = () => {
  const categorySlugMap = {
    'signature-bbq': 'SIGNATURE BBQ',
    'bbq-sandwiches': 'BBQ SANDWICHES',
    'lunch-plates': 'PITMASTER LUNCH PLATES',
    'bbq-by-pound': 'BBQ BY THE POUND',
    'family-meals': 'FAMILY MEALS',
    'fresh-bites': 'FRESH BITES',
    'pitmaster-picks': 'PITMASTER PICKS',
    'sides': 'SIDEKICKS',
    'desserts': 'DESSERTS',
    'beverages': 'BEVERAGES',
    'sauces-rubs': 'SAUCES & RUBS'
  };

  const categoryData = {};
  
  Object.entries(categorySlugMap).forEach(([slug, categoryName]) => {
    const category = categories.find(cat => cat.name === categoryName);
    const categoryItems = menu.filter(item => item.category === categoryName);
    
    // Debug logging
    console.log(`Category: ${categoryName}, Items found: ${categoryItems.length}`);
    if (categoryItems.length > 0) {
      console.log('Sample item:', categoryItems[0]);
    }
    
    if (category && categoryItems.length > 0) {
      categoryData[slug] = {
        title: category.name,
        description: category.description,
        items: categoryItems.map((item, index) => ({
          id: item.name ? item.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `item-${index}`,
          name: item.name || 'Unknown Item',
          description: item.description || 'No description available',
          price: typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : (item.price || 'Price not available'),
          image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 100) + 1}`,
          popular: Math.random() > 0.7 // Randomly mark some items as popular
        }))
      };
    }
  });
  
  return categoryData;
};

const categoryData = createCategoryData();

export default function MenuCategoryPage() {
  const { category } = useParams();
  const categoryInfo = categoryData[category];

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/menu" className="btn btn-primary">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero2}
        heroTitle={categoryInfo.title}
        heroSubtitle={categoryInfo.description}
      >
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <div className="breadcrumbs text-sm mb-8">
            <ul>
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/menu" className="link link-hover">Menu</Link></li>
              <li className="opacity-70">{categoryInfo.title}</li>
            </ul>
          </div>

          {/* Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{categoryInfo.title}</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryInfo.items.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <figure className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.popular && (
                    <div className="badge badge-primary badge-lg absolute top-4 right-4">
                      Popular
                    </div>
                  )}
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-xl">{item.name}</h3>
                  <p className="text-base-content/70 mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <div className="card-actions">
                      <Link 
                        to={`/menu/${category}/${item.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-outline btn-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Menu Button */}
          <div className="text-center mt-16">
            <Link to="/menu" className="btn btn-outline btn-lg">
              <i className="bi bi-arrow-left mr-2"></i>
              Back to Full Menu
            </Link>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}