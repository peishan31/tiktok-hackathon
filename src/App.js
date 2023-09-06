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
import Threads from "./pages/Threads";
import SavedItems from './pages/SavedItems';
import Wishlist from "./pages/Wishlist";
import ProductList from "./pages/ProductList";
import Topics from  "./pages/Topics";
import Topic from "./pages/Topic";
import CreateComment from "./pages/CreateComment";
import SeeWishlistBoard from "./pages/SeeWishlistBoard";
import CreateTopic from "./pages/CreateTopic";
import FriendsList from "./pages/FriendsList";
import AddCloseFriends from './pages/AddCloseFriends'

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/threads" component={Threads} />
          <Route exact path="/SavedItems" component={SavedItems} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/productList" component={ProductList} />
          <Route exact path="/topics/:getCategoryId" component={Topics} />
          <Route exact path="/topics/:getCategoryId/:getTopicId" component={Topic} />
          {/* <Route exact path="/topic" component={Topic} /> */}
          <Route exact path="/createComment" component={CreateComment} />
          <Route exact path="/seeWishlistBoard" component={SeeWishlistBoard} />
          <Route path="/seeWishlistBoard/:getWishlistName/:getUserId" component={SeeWishlistBoard} />
          <Route exact path="/createTopic/:getCategoryId" component={CreateTopic} />
          <Route exact path="/friendslist" component={FriendsList} />
          <Route exact path="/addCloseFriends" component={AddCloseFriends} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
