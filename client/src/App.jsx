import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { CartProvider } from './context/CartContextProvider';

// Page imports
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import About from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
import Login from './pages/LoginPage';
import Order from './pages/OrderPage';
import Menu from './pages/Menu/Menu';
import Gallery from './pages/GalleryPage';
import Catering from './pages/CateringPage';
import Newsletter from './pages/NewsletterPage';
import PitMaster from './pages/PitMasterPage/PitMaster';
import MenuCategoryPage from './pages/MenuCategoryPage';
import MenuItemPage from './pages/MenuItemPage';
import './index.css'; // Tailwind CSS styles

// Global styles and icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Initialize Firebase database
import './config/firebase';

function App() {

  return (
    <CartProvider>
      {/* Main content rendered via routes */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/pitmasters" element={<PitMaster />} />
          <Route path="/menu/:category" element={<MenuCategoryPage />} />
          <Route path="/menu/:category/:item" element={<MenuItemPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
