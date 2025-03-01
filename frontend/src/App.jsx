import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PaymentPopup from './components/PaymentPopup/PaymentPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Auth from './pages/Auth/Auth'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [toDeliver, setToDeliver] = useState(false)
  const [address, setAddress] = useState("")
  if (!localStorage.getItem("zestHeavenToken")) {
    return <Auth/>
  }
  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      {showPayment?<PaymentPopup toDeliver={toDeliver} address={address} setShowPayment={setShowPayment}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart setShowPayment={setShowPayment} toDeliver={toDeliver} setToDeliver={setToDeliver} address={address} setAddress={setAddress}/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
