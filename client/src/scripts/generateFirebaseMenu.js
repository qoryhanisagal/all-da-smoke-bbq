// Firebase Menu Generation Script for All Da Smoke BBQ
// This script converts menu data into Firebase-compatible JSON structure

const generateRandomImage = (category) => {
  const imageMap = {
    'BBQ SANDWICHES': Math.floor(Math.random() * 10) + 1,
    'SIDEKICKS': Math.floor(Math.random() * 10) + 11,
    'SAUCES & RUBS': Math.floor(Math.random() * 10) + 21,
    'BEVERAGES': Math.floor(Math.random() * 10) + 31,
    'DESSERTS': Math.floor(Math.random() * 10) + 41,
    'MEATS': Math.floor(Math.random() * 10) + 51
  };
  
  const randomId = imageMap[category] || Math.floor(Math.random() * 100) + 1;
  return `https://picsum.photos/400/300?random=${randomId}`;
};

const createItemId = (title) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Menu Categories
const categories = {
  'bbq-sandwiches': {
    name: 'BBQ SANDWICHES',
    slug: 'bbq-sandwiches',
    description: 'Authentic BBQ sandwiches served with shoestring fries and sauce',
    image: generateRandomImage('BBQ SANDWICHES')
  },
  'signature-bbq': {
    name: 'SIGNATURE BBQ',
    slug: 'signature-bbq',
    description: 'Slow smoked meats cooked to perfection',
    image: generateRandomImage('MEATS')
  },
  'pitmaster-picks': {
    name: 'PITMASTER PICKS',
    slug: 'pitmaster-picks',
    description: 'Texas toast plates with choice of meats and sides',
    image: generateRandomImage('MEATS')
  },
  'sidekicks': {
    name: 'SIDEKICKS',
    slug: 'sides',
    description: 'Traditional Southern sides made from scratch',
    image: generateRandomImage('SIDEKICKS')
  },
  'desserts': {
    name: 'DESSERTS',
    slug: 'desserts',
    description: 'Homemade desserts to sweeten your meal',
    image: generateRandomImage('DESSERTS')
  },
  'beverages': {
    name: 'BEVERAGES',
    slug: 'beverages',
    description: 'Refreshing drinks to complement your meal',
    image: generateRandomImage('BEVERAGES')
  },
  'sauces-rubs': {
    name: 'SAUCES & RUBS',
    slug: 'sauces-rubs',
    description: 'House-made sauces and rubs',
    image: generateRandomImage('SAUCES & RUBS')
  }
};

// Sidekicks Data
const sidekicks = [
  { name: 'Mac & Cheese', price: 3.50, description: 'Indulge in creamy macaroni infused with smoky flavors, a comforting classic that\'s irresistibly cheesy.' },
  { name: 'Baked Beans', price: 3.50, description: 'Sink your teeth into our BBQ Baked Beans, slow-cooked to perfection with a tangy sauce and savory chunks of bacon.' },
  { name: 'Collard Greens', price: 3.50, description: 'Experience the bold flavors of our Collard Greens, simmered to perfection with onions, garlic, and a hint of smoky goodness.' },
  { name: 'Cole Slaw', price: 3.50, description: 'Savor the crisp freshness of our Coleslaw, a perfect balance of crunchy cabbage and creamy dressing.' },
  { name: 'Green Beans', price: 3.50, description: 'Our Southern-style green beans, simmered to perfection with onions and spices, bring the warmth of home-cooked goodness to your plate.' },
  { name: 'Shoestring Fries', price: 3.50, description: 'Crispy golden fries cut thin and seasoned to perfection.' },
  { name: 'Candied Yams', price: 3.50, description: 'Savor the sweetness of our Candied Yams, tenderly baked with a caramelized glaze and warm spices.' },
  { name: 'Black Eyed Peas', price: 3.50, description: 'Delight in the hearty goodness of our Black-Eyed Peas, slow-simmered with aromatic spices for a rich, comforting flavor.' },
  { name: 'Potato Salad', price: 3.50, description: 'Relish the tangy crunch of our Potato Salad, a harmonious blend of tender potatoes, crisp vegetables, and zesty dressing.' },
  { name: 'Fire Roasted Corn', price: 3.50, description: 'Sweet corn roasted over open flames for that perfect smoky flavor.' },
  { name: 'Texas Toast', price: 2.00, description: 'Thick-cut bread toasted to golden perfection with garlic butter.' }
];

// Sauces Data
const sauces = [
  { name: 'Original BBQ', price: 0, description: 'Our Original House BBQ Sauce is a timeless classic, offering a rich and savory flavor with just the right touch of tang.' },
  { name: 'Sweet & Spicy', price: 0, description: 'Our Sweet & Spicy House BBQ Sauce offers the perfect balance of rich sweetness and a fiery kick.' },
  { name: 'Peach Bourbon', price: 0, description: 'Our Peach Bourbon BBQ Sauce offers a unique blend of sweet, juicy peaches and the warm, smoky notes of bourbon.' },
  { name: 'Carolina Gold', price: 0, description: 'Our Carolina Gold Sauce is a tangy and zesty twist on a Southern classic with a distinctive mustard bite.' }
];

// Beverages Data
const beverages = [
  { name: 'Sweet Tea', price: 2.50, description: 'Quench your thirst with our refreshing Sweet Tea, brewed to perfection and kissed with just the right amount of sweetness.' },
  { name: 'Lemonade', price: 2.50, description: 'Sip on the sunshine with our Southern-Style Lemonade, a tangy and refreshing concoction perfect for beating the heat.' },
  { name: 'Cola', price: 2.00, description: 'Classic cola soft drink.' },
  { name: 'Sprite', price: 2.00, description: 'Refreshing lemon-lime soda.' },
  { name: 'Dr. Pepper', price: 2.00, description: 'The unique taste of Dr. Pepper.' },
  { name: 'Root Beer', price: 2.00, description: 'Classic root beer with a smooth vanilla finish.' }
];

// Menu Items
const menuItems = {
  // BBQ Sandwiches
  'pulled-pork-sandwich': {
    title: 'Pulled Pork Sandwich',
    name: 'Pulled Pork Sandwich',
    category: 'BBQ SANDWICHES',
    price: 12.99,
    description: 'Tender pulled pork slow-smoked to perfection, served on a brioche bun with shoestring fries.',
    longDescription: 'Experience our mouthwatering Pulled Pork, slow-cooked to perfection and brimming with flavor. Served with our signature shoestring fries and your choice of sauce.',
    image: generateRandomImage('BBQ SANDWICHES'),
    popular: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 2.00 }
      ],
      sauces: sauces,
      sides: [
        { name: 'Shoestring Fries (included)', price: 0 },
        ...sidekicks.filter(side => side.name !== 'Shoestring Fries').map(side => ({ ...side, price: 1.00 }))
      ]
    },
    ingredients: ['Pork Shoulder', 'House Rub', 'Brioche Bun', 'Pickles', 'Onions'],
    allergens: ['Gluten', 'Soy']
  },

  'chopped-brisket-sandwich': {
    title: 'Chopped Brisket Sandwich',
    name: 'Chopped Brisket Sandwich',
    category: 'BBQ SANDWICHES',
    price: 14.99,
    description: '12-hour smoked Angus brisket chopped and served on Texas toast with shoestring fries.',
    longDescription: 'Our signature 12-hour smoked Angus brisket with perfect bark and juicy inside, chopped and piled high on Texas toast.',
    image: generateRandomImage('BBQ SANDWICHES'),
    popular: true,
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 2.50 }
      ],
      sauces: sauces,
      sides: [
        { name: 'Shoestring Fries (included)', price: 0 },
        ...sidekicks.filter(side => side.name !== 'Shoestring Fries').map(side => ({ ...side, price: 1.00 }))
      ]
    },
    ingredients: ['Angus Brisket', 'House Rub', 'Texas Toast', 'Pickles', 'Onions'],
    allergens: ['Gluten'],
    tags: ['Gluten-Free Available', 'Popular']
  },

  'smoked-turkey-sandwich': {
    title: 'Smoked Turkey Sandwich',
    name: 'Smoked Turkey Sandwich',
    category: 'BBQ SANDWICHES',
    price: 13.99,
    description: 'Delicately smoked turkey breast served on a brioche bun with shoestring fries.',
    longDescription: 'Savor the exquisite taste of our smoked turkey breast—delicately smoked to perfection, offering a tender and flavorful experience.',
    image: generateRandomImage('BBQ SANDWICHES'),
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 2.00 }
      ],
      sauces: sauces,
      sides: [
        { name: 'Shoestring Fries (included)', price: 0 },
        ...sidekicks.filter(side => side.name !== 'Shoestring Fries').map(side => ({ ...side, price: 1.00 }))
      ]
    },
    ingredients: ['Turkey Breast', 'House Rub', 'Brioche Bun', 'Lettuce', 'Tomato'],
    allergens: ['Gluten']
  },

  'slider-trio': {
    title: 'Slider Trio',
    name: 'Slider Trio',
    category: 'BBQ SANDWICHES',
    price: 15.99,
    description: 'Three sliders: Pulled Pork, Chopped Brisket, and Pulled Chicken served with shoestring fries.',
    longDescription: 'Can\'t decide? Try all three! Our popular trio featuring mini versions of our signature sandwiches.',
    image: generateRandomImage('BBQ SANDWICHES'),
    popular: true,
    customizations: {
      sauces: sauces,
      sides: [
        { name: 'Shoestring Fries (included)', price: 0 },
        ...sidekicks.filter(side => side.name !== 'Shoestring Fries').map(side => ({ ...side, price: 1.00 }))
      ]
    },
    ingredients: ['Pulled Pork', 'Chopped Brisket', 'Pulled Chicken', 'Slider Buns'],
    allergens: ['Gluten']
  }
};

// Add Desserts
const desserts = {
  'sweet-potato-pie': {
    title: 'Sweet Potato Pie',
    name: 'Sweet Potato Pie',
    category: 'DESSERTS',
    price: 4.00,
    description: 'Indulge in a slice of our Sweet Potato Pie, a heavenly blend of velvety sweet potatoes, warm spices, and a flaky crust.',
    longDescription: 'Each slice offers a taste of Southern tradition and homemade goodness, perfect for satisfying your sweet tooth.',
    image: generateRandomImage('DESSERTS'),
    ingredients: ['Sweet Potatoes', 'Eggs', 'Milk', 'Spices', 'Pie Crust'],
    allergens: ['Gluten', 'Dairy', 'Eggs']
  },
  'banana-pudding': {
    title: 'Banana Pudding',
    name: 'Banana Pudding',
    category: 'DESSERTS',
    price: 4.00,
    description: 'Dive into a spoonful of our Banana Pudding, a heavenly blend of creamy custard, ripe bananas, and luscious vanilla wafers.',
    longDescription: 'Each serving is a taste of Southern comfort, guaranteed to transport you to dessert bliss with every bite.',
    image: generateRandomImage('DESSERTS'),
    popular: true,
    ingredients: ['Bananas', 'Vanilla Wafers', 'Pudding', 'Whipped Cream'],
    allergens: ['Gluten', 'Dairy', 'Eggs']
  },
  'peach-cobbler': {
    title: 'Peach Cobbler',
    name: 'Peach Cobbler',
    category: 'DESSERTS',
    price: 4.50,
    description: 'Indulge in a serving of our Peach Cobbler, brimming with juicy peaches nestled beneath a golden-brown crust.',
    longDescription: 'Each spoonful is a taste of summertime sweetness, a comforting treat that\'s perfect for any occasion.',
    image: generateRandomImage('DESSERTS'),
    ingredients: ['Fresh Peaches', 'Cobbler Crust', 'Cinnamon', 'Sugar'],
    allergens: ['Gluten', 'Dairy']
  }
};

// Add Sidekicks as menu items
const sidekickItems = {};
sidekicks.forEach(side => {
  const id = createItemId(side.name);
  sidekickItems[id] = {
    title: side.name,
    name: side.name,
    category: 'SIDEKICKS',
    price: side.price,
    description: side.description,
    longDescription: side.description,
    image: generateRandomImage('SIDEKICKS'),
    customizations: {
      sizes: [
        { name: '6oz', price: 0 },
        { name: '12oz', price: 2.00 },
        { name: 'Family Size', price: 8.00 }
      ]
    }
  };
});

// Add Beverages as menu items
const beverageItems = {};
beverages.forEach(drink => {
  const id = createItemId(drink.name);
  beverageItems[id] = {
    title: drink.name,
    name: drink.name,
    category: 'BEVERAGES',
    price: drink.price,
    description: drink.description,
    longDescription: drink.description,
    image: generateRandomImage('BEVERAGES'),
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 1.00 }
      ]
    }
  };
});

// Add Sauces as purchasable items
const sauceItems = {};
sauces.forEach(sauce => {
  const id = createItemId(sauce.name);
  sauceItems[id] = {
    title: sauce.name,
    name: sauce.name,
    category: 'SAUCES & RUBS',
    price: 8.00,
    description: sauce.description,
    longDescription: sauce.description,
    image: generateRandomImage('SAUCES & RUBS'),
    customizations: {
      sizes: [
        { name: '16oz Bottle', price: 0 },
        { name: '32oz Bottle', price: 4.00 }
      ]
    }
  };
});

// Combine all menu items
const allMenuItems = {
  ...menuItems,
  ...desserts,
  ...sidekickItems,
  ...beverageItems,
  ...sauceItems
};

// Generate the complete Firebase structure
const firebaseData = {
  categories,
  menu: allMenuItems
};

// Export the data
export { firebaseData, categories, allMenuItems };

// For Node.js usage
/* global module */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { firebaseData, categories, allMenuItems };
}

// Console output for easy copying
console.log('=== FIREBASE CATEGORIES ===');
console.log(JSON.stringify(categories, null, 2));
console.log('\n=== FIREBASE MENU ITEMS ===');
console.log(JSON.stringify(allMenuItems, null, 2));
console.log('\n=== COMPLETE FIREBASE DATA ===');
console.log(JSON.stringify(firebaseData, null, 2));