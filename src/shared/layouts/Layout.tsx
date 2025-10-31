import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const Layout: React.FC = () => {
  return(
  <div className='min-h-screen flex flex-col'>
  <Header />
    <main className='grow bg-secondary-100 w-full px-0 mx-0'>
      <div className='max-w-7xl w-full mx-auto px-4 sm:px-6'>
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
)}

export default Layout;