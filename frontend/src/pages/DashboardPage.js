import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-google-charts'
import { summaryOrder } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import styled from 'styled-components'
import { IoIosBasket } from 'react-icons/io'
import { FaUsers, FaMoneyBillAlt } from 'react-icons/fa'
import { formatPrice } from '../utils/helpers'

export default function DashboardPage() {
  const orderSummary = useSelector((state) => state.orderSummary)
  const { loading, summary, error } = orderSummary
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(summaryOrder())
  }, [dispatch])
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>dashbord</h3>
        <h1 className='heading'>Your dashbord</h1>
        <div className='dashbord-container'>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message
              variant='danger'
              message='Error occured while laoding dashbord'
              name='hide'
            />
          ) : (
            <>
              <ul className='row summary'>
                <li>
                  <div className='summary-title color1'>
                    <span>
                      <FaUsers /> Users
                    </span>
                  </div>
                  <div className='summary-body'>
                    {summary.users[0].numUsers}
                  </div>
                </li>
                <li>
                  <div className='summary-title color2'>
                    <span>
                      <IoIosBasket /> Orders
                    </span>
                  </div>
                  <div className='summary-body'>
                    {summary.orders[0] ? summary.orders[0].numOrders : 0}
                  </div>
                </li>
                <li>
                  <div className='summary-title color3'>
                    <span>
                      <FaMoneyBillAlt /> Sales
                    </span>
                  </div>
                  <div className='summary-body'>
                    {summary.orders[0]
                      ? formatPrice(summary.orders[0].totalSales)
                      : 0}
                  </div>
                </li>
              </ul>
              <div>
                <div>
                  <h3 className='sub-heading'>sales</h3>
                  <h1 className='heading'>Your sales</h1>
                  {summary.dailyOrders.length === 0 ? (
                    <Message
                      message='There is no sales made'
                      name='hide'
                      variant='danger'
                    />
                  ) : (
                    <Chart
                      width='100%'
                      height='400px'
                      chartType='AreaChart'
                      loader={
                        <div className='chart-loading'>Loading Chart...</div>
                      }
                      data={[
                        ['Date', 'Sales'],
                        ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                      ]}
                    ></Chart>
                  )}
                </div>
              </div>
              <div>
                <h3 className='sub-heading'>categories</h3>
                <h1 className='heading'>product categories</h1>
                {summary.productCategories.length === 0 ? (
                  <Message
                    message='No Category found in the chart'
                    name='hide'
                    variant='danger'
                  />
                ) : (
                  <Chart
                    width='100%'
                    height='400px'
                    chartType='PieChart'
                    loader={
                      <div className='chart-loading'>Loading Chart...</div>
                    }
                    data={[
                      ['Category', 'Products'],
                      ...summary.productCategories.map((x) => [x._id, x.count]),
                    ]}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;

  @media screen and (min-width: 800px) {
    .row {
      display: flex;
    }
  }

  .chart-loading {
    font-size: 2rem;
    text-align: center;
    padding: 6rem 0;
    color: var(--clr-dark-grey);
  }
  .summary > li {
    border: 0.1rem var(--clr-blue) solid;
    margin: 2rem;
    border-radius: 0.5rem;
    flex: 1 1 20rem;
  }
  .summary-title {
    font-size: 3rem;
    padding: 1rem;
    color: var(--clr-white);
    background: var(--clr-blue);
  }
  .summary-body {
    font-size: 3rem;
    padding: 1rem;
    text-align: center;
    color: var(--clr-blue);
  }

  @media (min-width: 450px) {
    .summary-body,
    .summary-title {
      font-size: 5rem;
    }
  }
`
