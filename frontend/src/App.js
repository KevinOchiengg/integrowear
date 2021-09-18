import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute'
import SellerRoute from './components/SellerRoute'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import { AppProvider } from './context'
import RegisterPage from './pages/RegisterPage'
import ProductDetails from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'
import OrderListPage from './pages/OrderListPage'
import HomePage from './pages/HomePage'
import ProductListPage from './pages/ProductListPage'
import SupportPage from './pages/SupportPage'
import DashboardPage from './pages/DashboardPage'
import UserEditPage from './pages/UserEditPage'
import UserListPage from './pages/UserListPage'
import MapPage from './pages/MapPage'
import ProfilePage from './pages/ProfilePage'
import ProductEditPage from './pages/ProductEditPage'
import SellerPage from './pages/SellerPage'
import CartPage from './pages/CartPage'
import ShippingAddressPage from './pages/ShippingAddressPage'
import PaymentMethodPage from './pages/PaymentMethodPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import SigninPage from './pages/SigninPage'
import ErrorPage from './pages/ErrorPage'
import WishListPage from './pages/WishListPage'

function App() {
  return (
    <Router>
      <main>
        <AppProvider>
          <NavigationBar />
        </AppProvider>
        <Switch>
          <Route path='/seller/:id' component={SellerPage}></Route>
          <Route path='/cart/:id?' component={CartPage}></Route>
          <Route path='/product/:id' component={ProductDetails} exact></Route>
          <Route path='/products' component={ProductsPage} exact></Route>

          <Route
            path='/product/:id/edit'
            component={ProductEditPage}
            exact
          ></Route>
          <Route path='/signin' component={SigninPage}></Route>
          <Route path='/register' component={RegisterPage}></Route>
          <Route path='/shipping' component={ShippingAddressPage}></Route>
          <Route path='/payment' component={PaymentMethodPage}></Route>
          <Route path='/placeorder' component={PlaceOrderPage}></Route>
          <Route path='/order/:id' component={OrderPage}></Route>
          <Route path='/orderhistory' component={OrderHistoryPage}></Route>
          <Route path='/wishlist/:id?' component={WishListPage}></Route>
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
          <PrivateRoute path='/profile' component={ProfilePage}></PrivateRoute>
          <PrivateRoute path='/map' component={MapPage}></PrivateRoute>
          <AdminRoute
            path='/productlist'
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path='/productlist/pageNumber/:pageNumber'
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path='/orderlist'
            component={OrderListPage}
            exact
          ></AdminRoute>
          <AdminRoute path='/userlist' component={UserListPage}></AdminRoute>
          <AdminRoute
            path='/user/:id/edit'
            component={UserEditPage}
          ></AdminRoute>
          <AdminRoute path='/dashboard' component={DashboardPage}></AdminRoute>
          <AdminRoute path='/support' component={SupportPage}></AdminRoute>
          <SellerRoute
            path='/productlist/seller'
            component={ProductListPage}
          ></SellerRoute>
          <SellerRoute
            path='/orderlist/seller'
            component={OrderListPage}
          ></SellerRoute>
          <Route path='/' component={HomePage} exact></Route>
          <Route path='*' component={ErrorPage} exact></Route>
        </Switch>
        <Footer />
      </main>
    </Router>
  )
}

export default App

//  <Router>
//         <AppProvider>
//           <NavigationBar />
//         </AppProvider>
//         <Switch>
//           <Route path='/seller/:id'>
//             <SellerPage />
//           </Route>
//           <Route path='/cart/:id?'>
//             <CartPage />
//           </Route>

//           <Route path='/product/:id' exact>
//             <ProductDetails />
//           </Route>
//           <Route path='/products' exact>
//             <ProductsPage />
//           </Route>

//           <Route path='/product/:id/edit' exact>
//             <ProductEditPage />
//           </Route>

//           <Route path='/signin'>
//             <SigninPage />
//           </Route>
//           <Route path='/register'>
//             <RegisterPage />
//           </Route>
//           <Route path='/shipping'>
//             <ShippingAddressPage />
//           </Route>
//           <Route path='/payment'>
//             <PaymentMethodPage />
//           </Route>
//           <Route path='/placeorder'>
//             <PlaceOrderPage />
//           </Route>
//           <Route path='/order/:id'>
//             <OrderPage />
//           </Route>
//           <Route path='/orderhistory'>
//             <OrderHistoryPage />
//           </Route>
//           <Route path='/search/name/:name?' exact>
//             <ProductsPage />
//           </Route>
//           <Route path='/search/category/:category' exact>
//             <ProductsPage />
//           </Route>
//           <Route path='/search/category/:category/name/:name' exact>
//             <ProductsPage />
//           </Route>
//           <Route
//             path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
//             exact
//           >
//             <ProductsPage />
//           </Route>
//           <PrivateRoute path='/profile'>
//             <ProfilePage />
//           </PrivateRoute>
//           <PrivateRoute path='/map'>
//             <MapPage />
//           </PrivateRoute>
//           <AdminRoute path='/productlist' exact>
//             <ProductListPage />
//           </AdminRoute>
//           <AdminRoute path='/productlist/pageNumber/:pageNumber' exact>
//             <ProductListPage />
//           </AdminRoute>
//           <AdminRoute path='/orderlist' exact>
//             <OrderListPage />
//           </AdminRoute>
//           <AdminRoute path='/userlist'>
//             <UserListPage />
//           </AdminRoute>
//           <AdminRoute path='/user/:id/edit'>
//             <UserEditPage />
//           </AdminRoute>

//           <AdminRoute path='/dashboard'>
//             <DashboardPage />
//           </AdminRoute>
//           <AdminRoute path='/support'>
//             <SupportPage />
//           </AdminRoute>

//           <SellerRoute path='/productlist/seller'>
//             <ProductListPage />
//           </SellerRoute>
//           <SellerRoute path='/orderlist/seller'>
//             <OrderListPage />
//           </SellerRoute>

//           <Route path='/' exact>
//             <HomePage />
//           </Route>
//         </Switch>
//         <Footer />
//       </Router>
