import React from 'react'
import '../styles/App.css';
import  BMSNavbar  from './BMSNavbar';
import Home from './Home';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Favorites from './Favorites';
import BookTicket from './BookTicket';
import Payment from './Payment';
import BookSeat from './BookSeat';
const App = () => {


  return (
    <div id="main">
      <Router>
      <BMSNavbar/>
        <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route path ="/register"  element={<Register/>}/>
          <Route path ="/login"  element={<Login/>}/>
          <Route path ="/favorites"  element={<Favorites/>}/>
          <Route path ="/bookticket"  element={<BookTicket/>}/>
          <Route path ="/payment"  element={<Payment/>}/>
          <Route path ="/bookedseat"  element={<BookSeat/>}/>
        </Routes>
      </Router>
    </div>
  )
}


export default App;
