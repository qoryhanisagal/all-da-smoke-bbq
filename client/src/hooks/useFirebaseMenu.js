import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

export const useFirebaseMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    const categoriesRef = ref(database, 'categories');

    // Fetch menu items
    const unsubscribeMenu = onValue(menuRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert Firebase object to array
          const menuArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setMenuData(menuArray);
        } else {
          setMenuData([]);
        }
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError('Failed to fetch menu data');
      }
    });

    // Fetch categories
    const unsubscribeCategories = onValue(categoriesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert Firebase object to array
          const categoriesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setCategories(categoriesArray);
        } else {
          setCategories([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories data:', err);
        setError('Failed to fetch categories data');
        setLoading(false);
      }
    });

    // Cleanup subscriptions
    return () => {
      off(menuRef, 'value', unsubscribeMenu);
      off(categoriesRef, 'value', unsubscribeCategories);
    };
  }, []);

  // Group menu items by category
  const getMenuByCategory = () => {
    return categories.reduce((acc, category) => {
      acc[category.name] = menuData.filter(
        (item) => item.category === category.name
      );
      return acc;
    }, {});
  };

  // Get category by slug
  const getCategoryBySlug = (slug) => {
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

    const categoryName = categorySlugMap[slug];
    const category = categories.find(cat => cat.name === categoryName);
    const items = menuData.filter(item => item.category === categoryName);

    return category ? {
      ...category,
      items: items.map(item => ({
        ...item,
        id: item.name ? item.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : item.id,
        price: typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price,
        image: item.image || `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 100) + 1}`,
        popular: item.popular || Math.random() > 0.7
      }))
    } : null;
  };

  // Get menu item by category and item slug
  const getMenuItem = (categorySlug, itemSlug) => {
    const categoryData = getCategoryBySlug(categorySlug);
    if (!categoryData) return null;

    return categoryData.items.find(item => item.id === itemSlug);
  };

  return {
    menuData,
    categories,
    loading,
    error,
    getMenuByCategory,
    getCategoryBySlug,
    getMenuItem
  };
};