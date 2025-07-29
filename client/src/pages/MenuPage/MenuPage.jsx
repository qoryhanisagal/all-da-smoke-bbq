import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTabs from '../../components/CategoryTabs';
import MenuCarousel from '../../components/MenuCarousel';
import SectionDivider from '../../components/SectionDivider';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import FAQs from '../../components/FAQs/FAQs';
import { menuFAQs } from '../../data/faqs';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useFirebaseMenu } from '../../hooks/useFirebaseMenu';
import {
  heroBackgrounds,
  contentBackgrounds,
} from '../../data/backgroundImages';

const MenuPage = () => {
  const navigate = useNavigate();
  const { menuData, categories, loading, error, getMenuByCategory } =
    useFirebaseMenu();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Set initial category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  // Group menu items by category for easy section display
  const menuByCategory = useMemo(() => {
    return getMenuByCategory();
  }, [menuData, categories]);

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
        <div className="container mx-auto max-w-full px-4 py-8 h-[calc(100vh-4rem)]">
          {/* Two-column layout: left is category navigation, right is menu content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
            {/* Sidebar with all category buttons, always visible while scrolling */}
            <div className="lg:col-span-1 h-full">
              <div className="sticky top-4">
                <CategoryTabs
                  selected={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>
            </div>

            {/* Main menu area, scrolls independently from the rest of the page */}
            <div className="lg:col-span-3 h-full overflow-y-auto pr-2">
              {/* Render each category and its menu items in a section */}
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
                      className="mb-8 scroll-mt-20"
                    >
                      {/* Category header with title and description */}
                      <CategoryHeader
                        title={category.name}
                        description={category.description}
                      />
                      {/* All menu items for the current category */}
                      <MenuCarousel
                        items={categoryItems}
                        onItemClick={handleItemClick}
                        onOrderClick={handleOrderClick}
                      />
                    </section>

                    {/* Divider line between categories, except after the last one */}
                    {index < categories.length - 1 && <SectionDivider />}
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

export default MenuPage;
