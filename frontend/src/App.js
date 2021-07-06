import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'
import AdminRoute from './components/Admin/AdminRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import CartScreen from './screens/CartPage/CartScreen'
import HomeScreen from './screens/HomePage/HomeScreen'
import OrderHistoryScreen from './screens/OrderHistoryPage/OrderHistoryScreen'
import OrderScreen from './screens/OrderPage/OrderScreen'
import PaymentMethodScreen from './screens/PaymentMethodPage/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PaymentOrderPage/PlaceOrderScreen'
import ProductListScreen from './screens/ProductListPage/ProductListScreen'
import ProductScreen from './screens/ProductPage/ProductScreen'
import ProfileScreen from './screens/ProfilePage/ProfileScreen'
import RegisterScreen from './screens/RegisterPage/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAdressPage/ShippingAddressScreen'
import SigninScreen from './screens/ShippingAdressPage/SigninScreen'
import ProductEditScreen from './screens/ProductEditPage/ProductEditScreen'
import OrderListScreen from './screens/OrderListPage/OrderListScreen'
import UserListScreen from './screens/UserListPage/UserListScreen'
import UserEditScreen from './screens/UserEditPage/UserEditScreen'
import SellerRoute from './components/SellerRoute/SellerRoute'
import SellerScreen from './screens/SellerPage/SellerScreen'
import SearchScreen from './screens/SearchPage/SearchScreen'
import MapScreen from './screens/MapPage/MapScreen'
import DashboardScreen from './screens/DashbordPage/DashboardScreen'
import SupportScreen from './screens/SupportPage/SupportScreen'
import ChatBox from './components/ChartBox/ChatBox'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { AppProvider } from './context'

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <main>
          <AppProvider>
            <NavigationBar />
          </AppProvider>
          {/* <Navbar /> */}
          <Route path='/seller/:id' component={SellerScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/product/:id' component={ProductScreen} exact></Route>
          <Route
            path='/product/:id/edit'
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path='/signin' component={SigninScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/shipping' component={ShippingAddressScreen}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
          <Route
            path='/search/name/:name?'
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path='/search/category/:category'
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path='/search/category/:category/name/:name'
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
            component={SearchScreen}
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
