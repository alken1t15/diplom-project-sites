import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import {
    MAIN_PAGES_ROUTE, SHOP_PAGE_ROUTE,
    SIGN_IN_ROUTE, SIGN_UP_ROUTE, START_PAGE_ROUTE,
} from "./Utils/Routes";
import SignIn from "./Pages/SIgnIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import StartPage from "./Pages/StartPage/StartPage";
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./Components/Header/Header";

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
            </Route>



          </Route>

      </Routes>
    </div>
  );
}

export default App;
