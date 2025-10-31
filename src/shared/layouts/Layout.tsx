import React from 'react';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  return(
  <>
    <h1 className='headline-XL-bold text-primary-700'>Hello world from Layout</h1>
    <h1 className='headline-L-regular text-primary-700'>Hello world from Layout</h1>
    <h1 className='headline-M-bold text-primary-700'>Hello world from Layout</h1>
    <Footer />
  </>
)}

export default Layout;