import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import {
    SIGN_IN_ROUTE, SIGN_UP_ROUTE,
} from "./Utils/Routes";
import SignIn from "./Pages/SIgnIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
       
      <Routes>
          <Route path="/">
            <Route path={SIGN_IN_ROUTE} index element={<SignIn />} />
            <Route path={SIGN_UP_ROUTE} index element={<SignUp/>} />


          </Route>

      </Routes>
    </div>
  );
}

export default App;
