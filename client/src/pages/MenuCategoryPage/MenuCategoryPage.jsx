import { useParams, Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import Breadcrumb from '../../components/Breadcrumb';
import MenuItemGrid from '../../components/MenuItemGrid';
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
          <i className="bi bi-exclamation-triangle text-6xl text-warning mb-4"></i>
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-lg text-base-content/70 mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/menu" className="btn btn-primary">
            <i className="bi bi-arrow-left mr-2"></i>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'bi-house' },
    { label: 'Menu', href: '/menu', icon: 'bi-list-ul' },
    { label: categoryInfo.title, icon: 'bi-tag' }
  ];

  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero2}
        heroTitle={categoryInfo.title}
        heroSubtitle={categoryInfo.description}
      >
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{categoryInfo.title}</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>

          {/* Menu Items Grid */}
          <MenuItemGrid items={categoryInfo.items} category={category} />

          {/* Back to Menu Button */}
          <div className="text-center mt-16">
            <Link to="/menu" className="btn btn-outline btn-lg">
              <i className="bi bi-caret-left-fill mr-2"></i>
              Back to Full Menu
            </Link>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}