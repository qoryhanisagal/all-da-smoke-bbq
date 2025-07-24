import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';

// Page imports
import Home from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import Contact from './pages/ContactPage';
import About from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
import Login from './pages/LoginPage';
import Delivery from './pages/DeliveryPage';
import Menu from './pages/Menu/Menu';
import Gallery from './pages/GalleryPage';
import Catering from './pages/CateringPage';
import './index.css'; // Tailwind CSS styles

// Global styles and icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import { database } from './config/firebase'; // Initialize Firebase database

function App() {
  const location = useLocation();

  return (
    <>
      {/* Main content rendered via routes */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/test-menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/catering" element={<Catering />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
