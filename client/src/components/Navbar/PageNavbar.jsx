import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '/src/assets/img/logo1.png';

export default function PageNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="navbar sticky top-0 z-40 bg-base-100 shadow-lg px-6 h-20">
        <div className="flex items-center justify-between w-full max-w-8xl mx-auto">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src={logo} 
                alt="All Da Smoke BBQ Logo" 
                className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex gap-8 items-center font-[var(--font-anton)] text-base-content uppercase tracking-wide">
            <Link to="/menu" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Our Menu</Link>
            <Link to="/about" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Our Story</Link>
            <Link to="/catering" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Catering</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Gallery</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Contact</Link>
            <Link to="/faqs" className="hover:text-primary transition-colors duration-200 text-lg font-bold">FAQs</Link>
            <Link to="/newsletter" className="hover:text-primary transition-colors duration-200 text-lg font-bold">Newsletter</Link>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex gap-4 items-center">
            {!isMenuPage && (
              <Link to="/order" className="btn btn-primary rounded-full px-6 py-2 font-[var(--font-anton)] font-bold uppercase text-sm">
                Order Online
              </Link>
            )}
            
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-base-content">
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
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              className="btn btn-ghost text-base-content"
              onClick={toggleMobileMenu}
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Toggle with state */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-base-100 shadow-lg border-t border-base-300`}>
        <div className="flex flex-col p-4 space-y-3 font-[var(--font-anton)] uppercase text-sm">
          <Link 
            to="/menu" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Menu
          </Link>
          {!isMenuPage && (
            <Link 
              to="/order" 
              className="btn btn-primary btn-sm rounded-full w-fit font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Order Online
            </Link>
          )}
          <Link 
            to="/about" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link 
            to="/catering" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Catering
          </Link>
          <Link 
            to="/gallery" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/faqs" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQs
          </Link>
          <Link 
            to="/newsletter" 
            className="hover:text-primary transition-colors text-base-content font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Newsletter
          </Link>
        </div>
      </div>
    </>
  );
}