import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions'
import LoadingBox from '../components/Loading'
import MessageBox from '../components/Message'
import Pagination from '../components/Pagination'
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants'

export default function ProductListPage(props) {
  const { pageNumber = 1 } = useParams()

  const sellerMode = props.match.path.indexOf('/seller') >= 0
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      props.history.push(`/product/${createdProduct._id}/edit`)
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber })
    )
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ])

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id))
    }
  }
  const createHandler = () => {
    dispatch(createProduct())
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>products</h3>
        <h1 className='heading'>Product list</h1>
        <div className='row'>
          <button type='button' className='btn primary' onClick={createHandler}>
            Create Product
          </button>
        </div>
        <div className='row'>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant='danger'>{errorDelete}</MessageBox>
          )}

          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && (
            <MessageBox variant='danger'>{errorCreate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button
                          type='button'
                          className='edit-btn'
                          onClick={() =>
                            props.history.push(`/product/${product._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          className='delete-btn'
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <Pagination />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;

  button {
    padding: 1rem;
    margin: 0.2rem;
  }

  .primary {
    margin-bottom: 2rem;
  }

  .row {
    overflow-x: auto;
  }
`
