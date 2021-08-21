import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/Loading'
import MessageBox from '../components/Message'
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
        <h3 className='title'>Orders</h3>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
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
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 6em 0;

  .title {
    margin-bottom: 1em;
  }

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

  .edit-btn,
  .delete-btn {
    padding: 0.5em;
  }
`
