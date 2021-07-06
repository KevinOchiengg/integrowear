import React from 'react'
import { Link } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className='page'>
      <div className='content'>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to='/' className='btn'>
          Back Home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
