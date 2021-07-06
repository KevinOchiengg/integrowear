import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'
import './Product.css'

export default function Product(props) {
  const { product } = props
  return (
    <div className='col-3 product-item'>
      <figure key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className='img-fluid' />
        </Link>
      </figure>

      <h3>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </h3>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <span className='price'>Ksh {product.price}</span>
      <p className='description'>{product.description}</p>
      <div className='buttons__container'>
        <button className='btn'>Add</button>
        <button className='btn'>
          <Link to={`/product/${product._id}`}>View</Link>
        </button>
      </div>
    </div>
  )
}
