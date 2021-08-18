import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants'

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams()

  const sellerMode = props.match.path.indexOf('/seller') >= 0
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

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
        <div className='row'>
          <h3 className='title'>Products</h3>
          <button type='button' className='btn primary' onClick={createHandler}>
            Create Product
          </button>
        </div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
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
            <div className='row center pagination'></div>
            <div className='page-btn'>
              {[...Array(pages).keys()].map((x) => (
                <Link key={x + 1} to={`/productlist/pageNumber/${x + 1}`}>
                  <span className={x + 1 === page ? 'active' : ''}>
                    {x + 1}
                  </span>
                </Link>
              ))}
              <span>&#8594;</span>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 6em 0;
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .table tbody tr:nth-of-type(odd) {
    background: var(--clr-light-blue);
  }
  td,
  th {
    text-align: center;
    border: 0.1em solid #e4e4e4;
    padding: 0.5em;
  }
  .table button {
    margin: 0 0.2rem;
  }

  .primary {
    color: var(--clr-blue);
    font-size: 1rem;
  }
  h3 {
    margin-bottom: 0;
  }
  .page-btn {
    margin: 20px auto 80px;
  }

  a {
    color: var(--clr-blue);
  }

  .page-btn span {
    display: inline-block;
    border: 1px solid var(--clr-blue);
    margin: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    line-height: 40px;
    color: var(--clr-blue);
    transition: var(--transition);
  }

  .page-btn span:hover {
    background: var(--clr-hover);
  }
  .page-btn .active {
    background: var(--clr-yellow);
  }

  .edit-btn,
  .delete-btn {
    padding: 0.5em;
  }
`
