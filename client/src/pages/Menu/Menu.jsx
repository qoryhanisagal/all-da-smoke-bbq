import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTabs from '../../components/CategoryTabs';
import MenuCarousel from '../../components/MenuCarousel';
import MenuListView from '../../components/MenuListView';
import ViewToggle from '../../components/ViewToggle';
import FAQs from '../../components/FAQs/FAQs';
import { menuFAQs } from '../../data/faqs';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useFirebaseMenu } from '../../hooks/useFirebaseMenu';
import {
  heroBackgrounds,
  contentBackgrounds,
} from '../../data/backgroundImages';

const Menu = () => {
  const navigate = useNavigate();
  const { categories, loading, error, getMenuByCategory } =
    useFirebaseMenu();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('carousel');

  // Set initial category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  // Group menu items by category for easy section display
  const menuByCategory = useMemo(() => {
    return getMenuByCategory();
  }, [getMenuByCategory]);

  // Generate category slug from category name
  const getCategorySlug = (categoryName) => {
    const categorySlugMap = {
      'SIGNATURE BBQ': 'signature-bbq',
      'BBQ SANDWICHES': 'bbq-sandwiches',
      'PITMASTER LUNCH PLATES': 'lunch-plates',
      'BBQ BY THE POUND': 'bbq-by-pound',
      'FAMILY MEALS': 'family-meals',
      'FRESH BITES': 'fresh-bites',
      'PITMASTER PICKS': 'pitmaster-picks',
      SIDEKICKS: 'sides',
      DESSERTS: 'desserts',
      BEVERAGES: 'beverages',
      'SAUCES & RUBS': 'sauces-rubs',
    };
    return (
      categorySlugMap[categoryName] ||
      categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    );
  };

  // Generate item slug from item name/title (Firebase uses 'title' field)
  const getItemSlug = (item) => {
    const itemName = item.title || item.name;
    return itemName ? itemName.toLowerCase().replace(/[^a-z0-9]/g, '-') : '';
  };

  const handleOrderClick = (item) => {
    const categorySlug = getCategorySlug(item.category);
    const itemSlug = getItemSlug(item);
    const navigationPath = `/menu/${categorySlug}/${itemSlug}`;
    navigate(navigationPath);
  };

  const handleItemClick = (item) => {
    const categorySlug = getCategorySlug(item.category);
    const itemSlug = getItemSlug(item);
    const navigationPath = `/menu/${categorySlug}/${itemSlug}`;
    navigate(navigationPath);
  };

  // Create a unique HTML id for each category section for scroll navigation
  const getSectionId = (categoryName) => {
    return categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  // When the selected category changes, scroll the right content area to show that section
  useEffect(() => {
    const sectionId = getSectionId(selectedCategory);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory]);

  if (loading) {
    return <LoadingSpinner message="Loading Menu..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-error">
            Error Loading Menu
          </h2>
          <p className="text-base-content/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div data-theme="lofi" className="overflow-x-hidden">
      <HeroLayout
        heroImage={heroBackgrounds.hero1}
        heroTitle="Our Menu"
        heroSubtitle="Authentic BBQ crafted with passion. From smoky brisket to tender ribs, discover the flavors that make us legendary."
        contentBackgroundImage={contentBackgrounds.smokeTexture}
        contentAlignment="center"
      >
        <div className="container mx-auto max-w-full px-4 py-8">
          {/* Mobile Category Navigation */}
          <div className="lg:hidden mb-6">
            <CategoryTabs
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {/* View Toggle and Catering Link */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <ViewToggle view={viewMode} onChange={setViewMode} />
            <div className="text-sm">
              Looking for catering? 
              <a href="/catering" className="text-primary font-semibold ml-1 hover:underline">
                Head over here
              </a>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-4">
                <CategoryTabs
                  selected={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
            </div>

            {/* Main menu content */}
            <div className="lg:col-span-3">
              {/* Render each category and its menu items */}
              {categories.map((category, index) => {
                const categoryItems = menuByCategory[category.name];

                // Skip categories with no items
                if (!categoryItems || categoryItems.length === 0) {
                  return null;
                }

                return (
                  <div key={category.id}>
                    <section
                      id={getSectionId(category.name)}
                      className="mb-12 scroll-mt-20"
                    >
                      {/* Category header - smaller on mobile */}
                      <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-2">
                          {category.name}
                        </h2>
                        {category.description && (
                          <p className="text-base-content/70 text-sm md:text-base max-w-2xl">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Menu items - toggle between carousel and list view */}
                      {viewMode === 'carousel' ? (
                        <MenuCarousel
                          items={categoryItems}
                          onItemClick={handleItemClick}
                          onOrderClick={handleOrderClick}
                        />
                      ) : (
                        <MenuListView
                          items={categoryItems}
                          onItemClick={handleItemClick}
                          onOrderClick={handleOrderClick}
                        />
                      )}
                    </section>

                    {/* Divider between categories */}
                    {index < categories.length - 1 && (
                      <div className="border-t border-base-300 my-8"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* To show menu FAQs, uncomment the line below */}
          <FAQs faqs={menuFAQs} title="Menu FAQs" />
        </div>
      </HeroLayout>
    </div>
  );
};

export default Menu;