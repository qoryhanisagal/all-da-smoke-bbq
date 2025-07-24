import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '/src/assets/img/logo1.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div className="navbar sticky top-0 z-40 bg-black px-6 py-4">
        <div className="relative flex items-center justify-between w-full max-w-8xl mx-auto">
          {/* Left Links */}
          <div className="hidden lg:flex gap-8 items-center font-[var(--font-anton)] text-white uppercase tracking-wide">
            <Link to="/menu" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Our Menu</Link>
            <Link to="/order" className="btn btn-primary rounded-full px-6 py-2 text-white font-bold uppercase text-lg">
              Order Online
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Our Story</Link>
            <Link to="/catering" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Catering</Link>
          </div>

          {/* Center Logo - Hanging over navbar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 z-50">
            <Link to="/">
              <img 
                src={logo} 
                alt="All Da Smoke BBQ Logo" 
                className="h-56 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Right Links + Cart + Hamburger */}
          <div className="hidden lg:flex gap-6 items-center font-[var(--font-anton)] text-white uppercase tracking-wide">
            <Link to="/gallery" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Gallery</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Contact</Link>
            <Link to="/faqs" className="hover:text-primary transition-colors duration-200 text-lg font-bold">FAQs</Link>
            <Link to="/newsletter" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Newsletter</Link>
            
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                <div className="indicator">
                  <i className="bi bi-bag text-2xl"></i>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $0.00</span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">View Cart</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Hamburger Menu */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-white p-2"
              >
                <i className="bi bi-list text-2xl"></i>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 p-2 shadow-lg w-52"
              >
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/catering">Book Catering</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="btn btn-ghost text-white"
              onClick={toggleMobileMenu}
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Toggle with state */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-black text-white shadow-lg border-t border-gray-700`}>
        <div className="flex flex-col p-4 space-y-3 font-[var(--font-anton)] uppercase text-sm">
          <Link 
            to="/menu" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Menu
          </Link>
          <Link 
            to="/order" 
            className="btn btn-primary btn-sm rounded-full w-fit"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Order Online
          </Link>
          <Link 
            to="/about" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link 
            to="/catering" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Catering
          </Link>
          <Link 
            to="/gallery" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/faqs" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQs
          </Link>
          <Link 
            to="/newsletter" 
            className="hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Newsletter
          </Link>
        </div>
      </div>

    </>
  );
}