import React, { useState, useContext } from 'react'
import sublinks from './navbarLinks'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [isSearchBarOpen, setisSearchBarOpen] = useState(false)
  const [page, setPage] = useState({ page: '', links: [] })
  const [location, setLocation] = useState({})

  const openSeachBar = () => {
    setisSearchBarOpen(!isSearchBarOpen)
  }
  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text)
    setPage(page)
    setLocation(coordinates)
    setIsSubmenuOpen(true)
  }
  const closeSubmenu = () => {
    setIsSubmenuOpen(false)
  }

  return (
    <AppContext.Provider
      value={{
        isSearchBarOpen,
        openSeachBar,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        setIsSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
