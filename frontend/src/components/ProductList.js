import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const dispatch = useDispatch()
  const [grid_view, setGrid_view] = useState(false)
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch, products])

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  if (grid_view) {
    return <ListView products={products} />
  }
  return <GridView products={products} />
}

export default ProductList
