import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listOrderMine } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { formatPrice } from '../utils/helpers'

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector((state) => state.orderMineList)
  const { loading, error, orders } = orderMineList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listOrderMine())
  }, [dispatch])
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>Orders</h3>
        <h1 className='heading'>Your Order History </h1>
        <div className='row'>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message
              variant='danger'
              message='error loading order history'
              name='hide'
            />
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
                    <td>{formatPrice(order.totalPrice)}</td>
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
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 10rem 0;

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
  .btn-hide {
    display: none;
  }

  .alert {
    text-align: center;
  }

  .primary {
    color: var(--clr-blue);
    font-size: 11rem;
  }
  h3 {
    margin-bottom: 0;
  }

  .row {
    overflow-x: auto;
  }

  button {
    padding: 0.5em;
  }
`
