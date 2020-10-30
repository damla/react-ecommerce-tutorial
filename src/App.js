import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

class App extends Component {
  unsubscribeFromAuth = null; // surekli dinlenen obje

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // asenkron olmasi veri dinlemesi icin
      if (userAuth) {
        // CONTROL USER SIGNED IN
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            // kullaniciya ait butun datalara tek degiskenden ulasilmasini sagliyoruz
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/signin" component={SignInAndSignUpPage} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

// pass ettigin objenin action oldugunu belirtiyorsun
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
