import React, { Component, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import "./style/index.scss";
import "./style/index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./components/home-page/HomePage";
import MainNavbar from "./components/MainNavbar";
import MainFooter from "./components/MainFooter";
import Dashboard from "./components/dashboard/Dashboard";
import Categories from "./components/Categories";
import AddCategoryForm from "./components/dashboard/AddCategoryForm";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import EditCategories from "./components/dashboard/EditCategories";
import EditProducts from "./components/dashboard/EditProducts";
import AddProductForm from "./components/dashboard/AddProductForm";
import SignUpForm from "./components/login&signup/SignUpForm";
import LoginForm from "./components/login&signup/LoginForm";
import AllUsersPermissions from "./components/dashboard/AllUsersPermissions";
import Cart from "./components/cart/Cart";
import CheckOut from "./components/cart/CheckOut";
import AccountSettings from "./components/account-settings/AccountSettings";
import Addresses from "./components/account-settings/Addresses";
import OrdersHistory from "./components/account-settings/OrdersHistory";
import WishList from "./components/account-settings/WishList";
import AddAddressForm from "./components/account-settings/AddAddressForm";
import EditAddressForm from "./components/account-settings/EditAddressForm";
import EditAccountForm from "./components/account-settings/EditAccountForm";
import OrdersToShip from "./components/dashboard/OrdersToShip";
import ShippedOrders from "./components/dashboard/ShippedOrders";
import OrdersToDeliver from "./components/dashboard/OrdersToDeliver";
import DeliveredOrders from "./components/dashboard/DeliveredOrders";
import AllShippersList from "./components/dashboard/AllShippersList";
import AllAdminsList from "./components/dashboard/AllAdminsList";
import Page404 from "./components/404";
import GeneralSpinner from "./components/GeneralSpinner";
import { loadUser } from "./redux/actions/auth-actions/loadUser";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // load our user everytime we render
    dispatch(loadUser());
  }, [dispatch]);

  const { user, loading, auth } = useSelector(state => state.userrr);
  console.log("user", user);
  console.log("auth", auth);

  // this method to control 404 not found page
  const generateRoute = (path, Component) => {
    if (user && auth.isCustomer) {
      return <Route path={path} element={<Component />} />;
    } else if ((!user && !auth.customer)) {
      return <Route path={path} element={<Page404 />} />;
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <div className='App'>
        <MainNavbar />
        <div className='page-body'>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/categories' element={<Categories />} />
            {/* <Route path='/products' element={<div>sdsd</div>} /> */}
            <Route path='/products' element={<AllProducts />} />
            <Route path='/category/:id' element={<CategoryProducts />} />
            {/* <Route path='/settings' element={<AccountSettings />} /> */}

            {/* Account settings Routes */}
            {generateRoute("/settings", AccountSettings)}
            {generateRoute("/settings/edit_account", EditAccountForm)}
            {generateRoute("/my_orders", OrdersHistory)}
            {generateRoute("/my_addresses", Addresses)}
            {generateRoute("/my_addresses/add_address", AddAddressForm)}
            {generateRoute("/my_addresses/edit_address", EditAddressForm)}
            {generateRoute("/wish_list", WishList)}

            {/* Admin Dashboard  Routes */}
            {generateRoute("/dashboard", Dashboard)}
            {generateRoute("/addCategory", AddCategoryForm)}
            {generateRoute("/editCategories", EditCategories)}
            {generateRoute("/permissions", AllUsersPermissions)}
            {generateRoute("/dashboard/admin/admins_permissions", AllAdminsList)}
            {generateRoute("/dashboard/admin/shippers_permissions", AllShippersList)}

            {/* Seller Dashboard  Routes */}
            {generateRoute("/addProduct", AddProductForm)}
            {generateRoute("/editProducts", EditProducts)}
            {generateRoute("/dashboard/seller/orders_to_ship", OrdersToShip)}
            {generateRoute("/dashboard/seller/shipped_orders", ShippedOrders)}

            {/* Shipper Dashboard  Routes */}
            {generateRoute("/dashboard/shipper/orders_to_deliver", OrdersToDeliver)}
            {generateRoute("/dashboard/shipper/delivered_orders", DeliveredOrders)}

            {/* Cart Routes */}
            {generateRoute("/cart", Cart)}
            {generateRoute("/checkout", CheckOut)}

            {/* if no match just render 404 not found page */}
            <Route component={<Page404 />} />
          </Routes>
        </div>
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;
