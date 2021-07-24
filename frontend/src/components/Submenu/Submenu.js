import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'
import './Submenu.css'
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategories } from '../../actions/productActions'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { TiShoppingCart } from 'react-icons/ti'

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
    console.log(links)
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
    <aside
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
              return <MessageBox variant='danger'>{errorCategories}</MessageBox>
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
    </aside>
  )
}

export default Submenu
