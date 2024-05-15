import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import {
    CART_PAGE_ROUTE, CONTACTS_PAGE_ROUTE, FINISHED_PAGE_ROUTE,
    MAIN_PAGES_ROUTE, ORDER_PAGE_ROUTE, PROFILE_PAGE_ROUTE, SHOP_PAGE_ROUTE,
    SIGN_IN_ROUTE, SIGN_UP_ROUTE, START_PAGE_ROUTE,
} from "./Utils/Routes";
import SignIn from "./Pages/SIgnIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import StartPage from "./Pages/StartPage/StartPage";
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";
import CartPage from "./Pages/CartPage/CartPage";
import ContactsPage from "./Pages/ContactsPage/ContactsPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import FinishedPage from "./Pages/FinishedPage/FinishedPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
       
      <Routes>
          <Route path="/">
            <Route path={SIGN_IN_ROUTE} index element={<SignIn />} />
            <Route path={SIGN_UP_ROUTE} index element={<SignUp/>} />
            <Route path={START_PAGE_ROUTE} index element={<StartPage/>} />
            <Route path={MAIN_PAGES_ROUTE} element={<Header/>}>
                <Route path={SHOP_PAGE_ROUTE} index element={<MainPage/>} />
                <Route path={CART_PAGE_ROUTE} element={<CartPage/>} />
                <Route path={CONTACTS_PAGE_ROUTE} element={<ContactsPage/>} />
                <Route path={ORDER_PAGE_ROUTE} element={<OrderPage/>} />
                <Route path={FINISHED_PAGE_ROUTE} element={<FinishedPage/>} />
                <Route path={PROFILE_PAGE_ROUTE} element={<ProfilePage/>} />
            </Route>



          </Route>

      </Routes>
    </div>
  );
}

export default App;
