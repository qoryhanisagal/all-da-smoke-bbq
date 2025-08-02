import { Outlet } from 'react-router-dom';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
    </>
  );
}