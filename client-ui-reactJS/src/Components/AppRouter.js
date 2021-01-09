import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NotFound from './Nomatch/Nomatch'
import Kitchen from './Kitchen/Kitchen';
import Care from './Personalcare/PersonalCare';
import Household from './HouseHold/HouseHold';
import Contact from './Contact/Contact';
import Faq from './Customer/FAQ/FrequentlyAskedQues';
import Term from './Customer/Term/Terms';
import Desclaimer from './Customer/Disclaimer/Disclaimer';
import Privacypolicy from './Customer/PrivacyPolicy/PrivacyPolicy';
import Login from './Login/Login';
import Register from './Register/Register';
import Category from './Category-mobile/Category'
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Singleproduct from './Singleproduct/SingleProduct';
export default class Main extends Component {
  render() {
    return (
      <main>
        <div className="wrapper">
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/kitchen' component={Kitchen} />
            <Route path="/product-details" component={Singleproduct} />
            <Route path='/care' component={Care} />
            <Route path='/house-hold' component={Household} />
            <Route path='/contact' component={Contact} />
            <Route path='/faq' component={Faq} />
            <Route path='/term-and-condition' component={Term} />
            <Route path='/desclaimer' component={Desclaimer} />
            <Route path='/privacy-and-policy' component={Privacypolicy} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/categories' component={Category} />
            <Route path='/carts' component={Cart} />
            <Route path='/checkout' component={Checkout} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </main>
    );
  }
}