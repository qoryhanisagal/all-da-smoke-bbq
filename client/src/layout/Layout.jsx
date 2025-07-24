import { Outlet, useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import PageNavbar from '../components/Navbar/PageNavbar';
import Footer from '../components/Footer';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Full-width layout container */}
      <div className="w-full">
        {/* Banner and Navbar */}
        <Banner />
        {isHomePage ? <Navbar /> : <PageNavbar />}

        {/* Full-width content - no container constraints */}
        <div className="w-full">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
