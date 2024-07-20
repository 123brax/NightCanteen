import React from 'react'
import './PlaceOrder.css'
import { assets } from '../../assets/assets'

const PlaceOrder = () => {
  return (
    <div className="placeorder-container">
      <div className='placeorder'>
        <div className="placeorder-qr">
          <img src={assets.payment} alt="" />
        </div>
        <div className="placeorder-cod">
          <h1 className="placeorder-cod-title">
            Pay On Delivery
          </h1>
          <div className="placeorder-cod-desc">
            Shop with ease and convenience. Pay when you receive your order. Enjoy worry-free shopping with our Cash on Delivery option!
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
