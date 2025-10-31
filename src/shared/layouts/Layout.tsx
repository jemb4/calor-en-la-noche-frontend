import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const Layout: React.FC = () => {
  return(
  <div className='min-h-screen flex flex-col'>
  <Header />
    <main className='grow bg-basisc-100 px-0 mx-0'>
      <Outlet />
    </main>
    <Footer />
  </div>
)}

export default Layout;