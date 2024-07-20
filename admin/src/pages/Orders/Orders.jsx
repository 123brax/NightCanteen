import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error(response.data.error)
    }
  }

  async function statusHandler(e, orderId){
    const response = await axios.post(`${url}/api/order/status`,{orderId, status:e.target.value});
    if (response.data.success) {
      await fetchAllOrders()
    } else {
      toast.error(response.data.error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index)=>(
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                    if (index===order.items.length-1) {
                      return item.name+" x "+item.quantity
                    } else {
                      return item.name+" x "+item.quantity+", "
                    }
                })}
              </p>
            </div>
              <p className="order-item-address">{order.address}</p>
              <p>Items : {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select onChange={(e)=>statusHandler(e, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Food Prepared">Food Prepared</option>
                <option value="Payment Done">Payment Done</option>
                <option value="Payment Done">Cancelled</option>
              </select>
              <p className="order-item-name">{order.payment?"Done":"Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
