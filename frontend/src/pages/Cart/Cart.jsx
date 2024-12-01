import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Cart = ({setShowPayment, toDeliver, setToDeliver, setAddress, address}) => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url, fetchCoupon} = useContext(StoreContext)
  const navigate = useNavigate()
  const [promo, setPromo] = useState("")
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index)=>{
          if (cartItems[item._id]>0) {
            return (
              <>
                <div className='cart-items-title cart-items-item'>
                  <img className='cart-items-item-img' src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{cartItems[item._id]*item.price}</p>
                  <img onClick={()=>removeFromCart(item._id)} className='cart-items-item-rem' src={assets.cross_icon} alt="" />
                </div>
                <hr />
              </>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>To Deliver</p>
              <p><input type='checkbox' checked={toDeliver} onClick={()=> setToDeliver(prev=>!prev)}/></p>
            </div>
            {toDeliver ? <div className="cart-total-details delivery-cover">
              <p>Address</p>
              <p><input type="text" className='delivery-address' placeholder='Delivery Address' id="" value={address} onChange={e=> setAddress(e.target.value)}/></p>
            </div>:<></>}
            
            <hr />
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{((getTotalCartAmount() >= 200) || !toDeliver)?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()+(((getTotalCartAmount() >= 200) || !toDeliver)?0:20)}</p>
            </div>
          </div>
          <button disabled={getTotalCartAmount()===0} onClick={()=> setShowPayment(true)}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' id="" onChange={e=> setPromo(e.target.value)}/>
              <button onClick={()=>fetchCoupon(promo)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
