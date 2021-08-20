import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import SellerRoute from './components/SellerRoute'
import SellerScreen from './screens/SellerScreen'
import SearchScreen from './screens/SearchScreen'
import MapScreen from './screens/MapScreen'
import DashboardScreen from './screens/DashboardScreen'
import SupportScreen from './screens/SupportScreen'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import { AppProvider } from './context'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import ProductDetails from './screens/ProductDetails'
import ProductsPage from './screens/ProductsPage'

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
