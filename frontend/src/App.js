import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute'
import CartScreen from './pages/CartPage'
import HomeScreen from './pages/HomePage'
import OrderHistoryScreen from './pages/OrderHistoryPage'
import OrderScreen from './pages/OrderPage'
import PaymentMethodScreen from './pages/PaymentMethodPage'
import PlaceOrderScreen from './pages/PlaceOrderPage'
import ProductListScreen from './pages/ProductListPage'
import ProfileScreen from './pages/ProfilePage'
import ShippingAddressScreen from './pages/ShippingAddressPage'
import ProductEditScreen from './pages/ProductEditPage'
import OrderListScreen from './pages/OrderListPage'
import UserListScreen from './pages/UserListPage'
import UserEditScreen from './pages/UserEditPage'
import SellerRoute from './components/SellerRoute'
import SellerScreen from './pages/SellerPage'
import MapScreen from './pages/MapPage'
import DashboardScreen from './pages/DashboardPage'
import SupportScreen from './pages/SupportPage'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import { AppProvider } from './context'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductDetails from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <main>
          <AppProvider>
            <NavigationBar />
          </AppProvider>
          <Route path='/seller/:id' component={SellerScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>

          <Route path='/product/:id' component={ProductDetails} exact></Route>
          <Route path='/products' component={ProductsPage} exact></Route>

          <Route
            path='/product/:id/edit'
            component={ProductEditScreen}
            exact
          ></Route>

          <Route path='/login' component={LoginPage}></Route>
          <Route path='/register' component={RegisterPage}></Route>
          <Route path='/shipping' component={ShippingAddressScreen}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
          <Route
            path='/search/name/:name?'
            component={ProductsPage}
            exact
          ></Route>
          <Route
            path='/search/category/:category'
            component={ProductsPage}
            exact
          ></Route>
          <Route
            path='/search/category/:category/name/:name'
            component={ProductsPage}
            exact
          ></Route>
          <Route
            path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
            component={ProductsPage}
            exact
          ></Route>
          <PrivateRoute
            path='/profile'
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path='/map' component={MapScreen}></PrivateRoute>
          <AdminRoute
            path='/productlist'
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path='/productlist/pageNumber/:pageNumber'
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path='/orderlist'
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path='/userlist' component={UserListScreen}></AdminRoute>
          <AdminRoute
            path='/user/:id/edit'
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path='/dashboard'
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path='/support' component={SupportScreen}></AdminRoute>

          <SellerRoute
            path='/productlist/seller'
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path='/orderlist/seller'
            component={OrderListScreen}
          ></SellerRoute>

          <Route path='/' component={HomeScreen} exact></Route>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
