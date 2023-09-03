import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import Discussion from "./pages/Discussion";
import Wishlist from "./pages/Wishlist";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/discussion" component={Discussion} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/productList" component={ProductList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
