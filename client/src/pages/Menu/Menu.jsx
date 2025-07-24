import { useEffect, useState } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from '../../config/firebase';

export default function Menu() {
  const [menuData, setMenuData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Checking...');

  useEffect(() => {
    // Test Firebase connection first
    const testConnection = async () => {
      try {
        setConnectionStatus('Testing connection...');

        // Test by reading a simple value
        const testRef = ref(database, '.info/connected');
        onValue(testRef, (snapshot) => {
          const connected = snapshot.val();
          setConnectionStatus(
            connected ? '✅ Connected to Firebase' : '❌ Not connected'
          );
        });

        // Load menu data
        const menuRef = ref(database, 'menu');
        const menuSnapshot = await get(menuRef);

        if (menuSnapshot.exists()) {
          const data = menuSnapshot.val();
          console.log('Menu data loaded:', data);
          setMenuData(data);
        } else {
          console.log('No menu data found');
          setError('No menu data found in Firebase');
        }

        // Load categories
        const categoriesRef = ref(database, 'categories');
        const categoriesSnapshot = await get(categoriesRef);

        if (categoriesSnapshot.exists()) {
          const data = categoriesSnapshot.val();
          console.log('Categories loaded:', data);
          setCategories(data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Firebase error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading menu from Firebase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  // Convert menu object to array
  const menuArray = menuData
    ? Object.entries(menuData).map(([key, item]) => ({
        ...item,
        firebaseKey: key,
      }))
    : [];

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Firebase Menu Test</h1>

        {/* Connection Status */}
        <div className="alert alert-info mb-6">
          <span>Firebase Status: {connectionStatus}</span>
        </div>

        {/* Debug Info */}
        <div className="card bg-base-200 mb-8">
          <div className="card-body">
            <h2 className="card-title">Debug Info</h2>
            <ul className="list-disc list-inside">
              <li>Menu items loaded: {menuArray.length}</li>
              <li>
                Categories loaded:{' '}
                {categories ? Object.keys(categories).length : 0}
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuArray.map((item) => (
            <div
              key={item.firebaseKey}
              className="card card-border bg-base-100"
            >
              <div className="card-body">
                <h3 className="card-title text-lg">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold">${item.price}</span>
                  <div className="badge badge-primary">{item.category}</div>
                </div>
                <div className="text-xs text-base-content/60 mt-2">
                  Key: {item.firebaseKey}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Raw Data Preview */}
        <details className="collapse collapse-arrow bg-base-200 mt-8">
          <summary className="collapse-title text-xl font-medium">
            View Raw Data
          </summary>
          <div className="collapse-content">
            <pre className="text-xs overflow-auto">
              {JSON.stringify({ menu: menuData, categories }, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
