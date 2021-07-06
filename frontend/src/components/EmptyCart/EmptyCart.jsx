import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyCart.css';
import Footer from '../Footer/Footer';

export default function EmptyCart() {
  return (
    <>
      <section className='empty-cart'>
        <h2>Oops! Your Cart is Empty...</h2>
        <Link to='/' className='btn'>
          Fill It
        </Link>
      </section>
      <Footer />
    </>
  );
}
