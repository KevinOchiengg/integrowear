import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories } from '../actions/productActions'
import LoadingBox from './Loading'
import MessageBox from './Message'
import { TiShoppingCart } from 'react-icons/ti'
import styled from 'styled-components'

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

            if (loadingCategories) return <LoadingBox />
            else if (errorCategories)
              return <MessageBox variant='danger'>Error</MessageBox>
            else if (page === 'Category' && categories) {
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
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: none;
  padding: 2rem;
  border-radius: var(--radius);
  transition: var(--transition);

  .submenu::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--clr-white);
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .submenu-center {
    display: grid;
    gap: 0.25rem 2rem;
  }
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
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .submenu-center a {
    width: 10rem;
    display: block;
    color: var(--clr-blue);
    text-transform: capitalize;
    display: flex;
    align-items: center;
  }
  .submenu-center svg {
    color: var(--clr-blue);
    margin-right: 1rem;
  }
`
