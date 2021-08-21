import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chart from 'react-google-charts'
import { summaryOrder } from '../actions/orderActions'
import LoadingBox from '../components/Loading'
import MessageBox from '../components/Message'
import styled from 'styled-components'

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
        <div>
          <h3 className='title'>Dashboard</h3>
        </div>
        <div className='dashbord-container'>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              <ul className='row summary'>
                <li>
                  <div className='summary-title color1'>
                    <span>
                      <i className='fa fa-users' /> Users
                    </span>
                  </div>
                  <div className='summary-body'>
                    {summary.users[0].numUsers}
                  </div>
                </li>
                <li>
                  <div className='summary-title color2'>
                    <span>
                      <i className='fa fa-shopping-cart' /> Orders
                    </span>
                  </div>
                  <div className='summary-body'>
                    {summary.orders[0] ? summary.orders[0].numOrders : 0}
                  </div>
                </li>
                <li>
                  <div className='summary-title color3'>
                    <span>
                      <i className='fa fa-money' /> Sales
                    </span>
                  </div>
                  <div className='summary-body'>
                    Ksh
                    {summary.orders[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </div>
                </li>
              </ul>
              <div>
                <div>
                  <h3 className='title'>Sales</h3>
                  {summary.dailyOrders.length === 0 ? (
                    <MessageBox>No Sale</MessageBox>
                  ) : (
                    <Chart
                      width='100%'
                      height='400px'
                      chartType='AreaChart'
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Date', 'Sales'],
                        ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                      ]}
                    ></Chart>
                  )}
                </div>
              </div>
              <div>
                <h3 className='title'>Categories</h3>
                {summary.productCategories.length === 0 ? (
                  <MessageBox>No Category</MessageBox>
                ) : (
                  <Chart
                    width='100%'
                    height='400px'
                    chartType='PieChart'
                    loader={<div>Loading Chart</div>}
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
  margin: 6em 0;

  @media screen and (min-width: 800px) {
    .row {
      display: flex;
    }
    .title {
      margin: 2em 0;
    }
  }

  .summary > li {
    border: 0.1rem var(--clr-blue) solid;
    margin: 2rem;
    border-radius: 0.5rem;
    flex: 1 1 20rem;
  }
  .summary-title {
    font-size: 2rem;
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
`
