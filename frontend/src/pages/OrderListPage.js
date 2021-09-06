import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteOrder, listOrders } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

export default function OrderListPage(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET })
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }))
  }, [dispatch, sellerMode, successDelete, userInfo._id])
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id))
    }
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>Orders</h3>
        <h1 className='heading'>Your Orders</h1>
        <div className='row'>
          {loadingDelete && <Loading />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant='danger' message='error loading order list' />
          ) : (
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <button
                        type='button'
                        className='edit-btn'
                        onClick={() => {
                          props.history.push(`/order/${order._id}`)
                        }}
                      >
                        Details
                      </button>
                      <button
                        type='button'
                        className='delete-btn'
                        className='small'
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;

  .primary {
    color: var(--clr-blue);
    font-size: 1rem;
  }

  button {
    padding: 1rem;
    margin: 0.2rem;
  }

  .row {
    overflow-x: auto;
  }
`
