import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories } from '../actions/productActions'
import { TiShoppingCart } from 'react-icons/ti'
import styled from 'styled-components'
import Loading from './Loading'
import Message from './Message'

const Submenu = () => {
  const {
    isSubmenuOpen,
    closeSubmenu,
    page: { page, links },
    location,
  } = useGlobalContext()

  const container = useRef(null)

  const [columns, setColumns] = useState('col-2')
  const dispatch = useDispatch()

  useEffect(() => {
    setColumns('col-2')
    const submenu = container.current
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
    if (links.length === 3) {
      setColumns('col-3')
    }
    if (links.length > 3) {
      setColumns('col-4')
    }
  }, [page, location, links])

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList
  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])
  return (
    <Wrapper
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { url, icon, label } = link

            if (loadingCategories) return <Loading />
            else if (errorCategories)
              return <Message variant='danger' message='Error' name='hide' />
            else if (page === 'CATEGORY' && categories) {
              return categories.map((c) => (
                <Link
                  key={c}
                  to={`/search/category/${c}`}
                  onClick={closeSubmenu}
                >
                  {<TiShoppingCart />}
                  {c}
                </Link>
              ))
            } else
              return (
                <Link to={url} key={index} onClick={closeSubmenu}>
                  {icon}
                  {label}
                </Link>
              )
          })}
        </div>
      </section>
    </Wrapper>
  )
}

export default Submenu

const Wrapper = styled.section`
  background: var(--clr-white);
  box-shadow: var(--dark-shadow);
  position: fixed;
  margin-top: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: none;
  padding: 2rem;
  border-radius: var(--radius);
  transition: var(--transition);

  .col-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .col-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .col-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  h4 {
    color: var(--clr-blue);
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  a {
    width: 10rem;
    display: block;
    color: var(--clr-blue);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    &:hover,
    &:focus {
      color: var(--clr-yellow);
    }
  }

  .submenu-center svg {
    color: var(--clr-blue);
    margin-right: 1rem;
    font-size: 1.6rem;
  }
`
