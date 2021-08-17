import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listOrderMine } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList)
  const { loading, error, orders } = orderMineList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listOrderMine())
  }, [dispatch])
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='title'>Order History</h3>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
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
                      className='btn small'
                      onClick={() => {
                        props.history.push(`/order/${order._id}`)
                      }}
                    >
                      Details
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
  .section-center {
    height: 100vh;
    border: 2px solid red;
  }

  .table {
    border: 2px solid red;
  }
`
