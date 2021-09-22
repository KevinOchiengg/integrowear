import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'
import Message from '../components/Message'
import { formatPrice } from '../utils/helpers'

const WishListPage = (props) => {
  const productId = props.match.params.id
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1
  const wishList = useSelector((state) => state.wishList)
  const { wishListItems, error } = wishList
  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToWishList(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromWishListHandler = (id) => {
    // delete action
    dispatch(removeFromWishList(id))
  }

  if (wishListItems.length === 0) {
    return (
      <Wrapper>
        <div className='row section-center'>
          <h3 className='sub-heading'>wishlist</h3>
          <h1 className='heading'>your wishlist</h1>
          <Message
            message='Oops! your wish list is empty'
            buttonText='Go shopping'
            url='/products'
          />
        </div>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <div className='row section-center'>
          <h3 className='sub-heading'>wishlist</h3>
          <h1 className='heading'>your wishlist</h1>
          <Message
            message='Error Loading Your wish List'
            name='hide'
            variant='danger'
          />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='row section-center'>
        <h3 className='sub-heading'>wishlist</h3>
        <h1 className='heading'>your wishlist</h1>
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Images</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Stock Status</th>
                <th>add to cart</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishListItems.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>
                      <Link to='#'>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </td>
                    <td>
                      <Link to='#'>{item.name}</Link>
                    </td>
                    <td>
                      <span className='amount'>{formatPrice(item.price)}</span>
                    </td>
                    <td>
                      {item.countInStock > 0 ? (
                        <span className='out-stock'>in stock</span>
                      ) : (
                        <span className='out-stock'>out stock</span>
                      )}
                    </td>
                    <td>
                      <Link
                        className='btn'
                        to={`/cart/${productId}?qty=${qty}`}
                      >
                        add to cart
                      </Link>
                    </td>
                    <td>
                      <button
                        type='submit'
                        className='remove-btn'
                        onClick={() => removeFromWishListHandler(item.product)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem auto;
  .table-container {
    overflow-x: auto;
  }
  img {
    width: 10rem;
  }
  .remove-btn {
    background: none;
  }
  .alert {
    text-align: center;
  }

  .btn {
    word-wrap: none;
  }
`

export default WishListPage
