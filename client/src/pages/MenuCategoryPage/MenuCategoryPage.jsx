import { useParams, Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import Breadcrumb from '../../components/Breadcrumb';
import MenuItemGrid from '../../components/MenuItemGrid';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useFirebaseMenu } from '../../hooks/useFirebaseMenu';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function MenuCategoryPage() {
  const { category } = useParams();
  const { loading, error, getCategoryBySlug } = useFirebaseMenu();
  const categoryInfo = getCategoryBySlug(category);

  if (loading) {
    return <LoadingSpinner message="Loading Category..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-error">Error Loading Category</h2>
          <p className="text-base-content/70">{error}</p>
        </div>
      </div>
    );
  }

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
    { label: categoryInfo.name, icon: 'bi-tag' }
  ];

  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero2}
        heroTitle={categoryInfo.name}
        heroSubtitle={categoryInfo.description}
      >
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{categoryInfo.name}</h2>
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