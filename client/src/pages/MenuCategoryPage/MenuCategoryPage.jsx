import { useParams, Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

// Mock data for different categories
const categoryData = {
  'bbq-sandwiches': {
    title: 'BBQ Sandwiches',
    description: 'Tender, slow-smoked meats piled high on fresh buns with our signature sauces',
    items: [
      {
        id: 'beef-brisket',
        name: 'Beef Brisket Sandwich',
        description: 'Slow-smoked for 14 hours, sliced thick and piled high',
        price: '$12.99',
        image: 'https://picsum.photos/400/300?random=1',
        popular: true
      },
      {
        id: 'pulled-pork',
        name: 'Pulled Pork Sandwich',
        description: 'Tender pork shoulder, hand-pulled and seasoned to perfection',
        price: '$11.99',
        image: 'https://picsum.photos/400/300?random=2'
      },
      {
        id: 'smoked-chicken',
        name: 'Smoked Chicken Sandwich',
        description: 'Juicy smoked chicken breast with your choice of sauce',
        price: '$10.99',
        image: 'https://picsum.photos/400/300?random=3'
      },
      {
        id: 'burnt-ends',
        name: 'Burnt Ends Sandwich',
        description: 'Cubed brisket burnt ends with our signature glaze',
        price: '$13.99',
        image: 'https://picsum.photos/400/300?random=4',
        popular: true
      }
    ]
  },
  'bbq-plates': {
    title: 'BBQ Plates',
    description: 'Full meals with your choice of meat, two sides, and cornbread',
    items: [
      {
        id: 'brisket-plate',
        name: 'Brisket Plate',
        description: 'Sliced brisket with two sides and cornbread',
        price: '$16.99',
        image: 'https://picsum.photos/400/300?random=5',
        popular: true
      },
      {
        id: 'ribs-plate',
        name: 'Baby Back Ribs',
        description: 'Half rack of tender ribs with two sides',
        price: '$18.99',
        image: 'https://picsum.photos/400/300?random=6'
      },
      {
        id: 'combo-plate',
        name: 'BBQ Combo Plate',
        description: 'Choice of two meats with two sides and cornbread',
        price: '$19.99',
        image: 'https://picsum.photos/400/300?random=7',
        popular: true
      }
    ]
  },
  'sides': {
    title: 'Sides',
    description: 'Traditional BBQ sides made from scratch daily',
    items: [
      {
        id: 'mac-cheese',
        name: 'Mac & Cheese',
        description: 'Creamy three-cheese macaroni',
        price: '$4.99',
        image: 'https://picsum.photos/400/300?random=8'
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        description: 'Fresh, crispy coleslaw with tangy dressing',
        price: '$3.99',
        image: 'https://picsum.photos/400/300?random=9'
      },
      {
        id: 'baked-beans',
        name: 'Baked Beans',
        description: 'Slow-cooked beans with brown sugar and bacon',
        price: '$4.49',
        image: 'https://picsum.photos/400/300?random=10',
        popular: true
      }
    ]
  }
};

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