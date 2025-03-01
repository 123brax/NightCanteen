import React, { useContext, useState } from 'react'
import './PaymentPopup.css'
import { assets } from '../../assets/assets'
import Lottie from 'lottie-react'
import successPayment from '../../assets/success.json'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PaymentPopup = ({ setShowPayment, toDeliver, address }) => {
  const {getTotalCartAmount, token, food_list, cartItems, url, setCartItems} = useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Payment Mode")
  const [currentButtonState, setCurrentButtonState] = useState("Proceed")
  const [paymentMode, setPaymentMode] = useState("upi")
  const navigate = useNavigate()
  async function moveToNext(e) {
    e.preventDefault()
    if (currentState === "Payment Mode" && paymentMode === "upi") {
      setCurrentState("QR code")
      setCurrentButtonState("Payment done")
    } else if (currentState === "Thank you"){
      let orderItems = []
      food_list.map((item)=>{
        if (cartItems[item._id]>0) {
          let itemInfo = item
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })
      let deliver = "On Store"
      if (toDeliver) {
        deliver=address
      }
      const response = await axios.post(url+"/api/order/place",{
        amount: getTotalCartAmount(),
        items: orderItems,
        address: deliver,
      }, {headers:{token}})

      if (response.data.success) {
        setCartItems({})
        navigate("/myorders")
      } else {
        alert("Something went wrong. Please retry")
      }

      setShowPayment(false)
    } else {
      setCurrentState("Thank you")
      setCurrentButtonState("Done")
    }
  }
  return (
    <div className='paymentPopup-popup'>
      <form className="paymentPopup-popup-container">
        <div className="paymentPopup-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowPayment(false)} src={assets.cross_icon} alt="" />
        </div>
        {currentState === "Payment Mode" ?
          <>
            <div className="paymentPopup-popup-paymentmode" onClick={() => setPaymentMode("upi")}>
              <input type="radio" name='paymentmode' checked={paymentMode === "upi"} />
              <div className="paymentPopup-popup-paymentmode-type">
                <p>Upi payment</p>
                <p>Fast, secure payments with UPI. Simplify your transactions today!</p>
              </div>
            </div>
            <hr />
            {/* <div className="paymentPopup-popup-paymentmode" onClick={() => setPaymentMode("cod")}>
              <input type="radio" name='paymentmode' checked={paymentMode === "cod"} />
              <div className="paymentPopup-popup-paymentmode-type">
                <p>Pay on Delivery</p>
                <p>Order now, pay on delivery. Simple, secure, and convenient!</p>
              </div>
            </div> */}
          </> :
          currentState === "QR code" ?
            <div className="paymentPopup-popup-paymentmode-qr" onClick={() => setPaymentMode("upi")}>
              <img src={assets.payment} alt="" />
            </div>
            :
            <div className="paymentPopup-popup-thank">
              <p>Will recieve a confirmation call in short time</p>
              <div className='paymentPopup-lottie-success-payment-container'>
                <Lottie loop={false} className='paymentPopup-lottie-success-payment' animationData={successPayment}/>
              </div>
            </div>

        }
        <input className='paymentPopup-popup-submit' type="submit" value={currentButtonState} onClick={(e) => moveToNext(e)} />
      </form>
    </div>
  )
}
export default PaymentPopup
