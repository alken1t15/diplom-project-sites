import React from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import {
    SIGN_IN_ROUTE,
} from "./Utils/Routes";
import SignIn from "./Pages/SIgnIn/SignIn";

function App() {
  return (
    <div className="App">
       
      <Routes>
          <Route path="/">
            <Route path={SIGN_IN_ROUTE} index element={<SignIn />} />


          </Route>

      </Routes>
    </div>
  );
}

export default App;
