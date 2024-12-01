import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"New",
    coupon:"",
    discount:0
  })

  function onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image)
    formData.append("upload_preset", "fps0bfea")
    formData.append("cloud_name", "dmewzm6mg")
    let imageUploadUrl = ""
    try {
      let imageUpload = await fetch("https://api.cloudinary.com/v1_1/dmewzm6mg/image/upload",{
        method: "post",
        body:formData
      })
      let imageUploadJson = await imageUpload.json()
      imageUploadUrl = imageUploadJson.url
    } catch (error) {
      toast.error(error)
    }

    let reqdata = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: imageUploadUrl,
    }

    const response = await axios.post(
      `${url}/api/food/add`, reqdata
    )

    if (response.data.success) {
      setData(
        {
          name:"",
          description:"",
          price:"",
          category:"Salad"
        }
      )
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
  
  async function onCouponSubmitHandler(event) {
    event.preventDefault();
    let reqdata = {
      name: data.coupon,
      discount: data.discount
    }

    const response = await axios.post(
      `${url}/api/coupon/add`, reqdata
    )

    if (response.data.success) {
      setData(
        {
          name:"",
          description:"",
          price:"",
          category:"Salad",
          coupon:"",
          discount:0
        }
      )
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="image" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' id="" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder='Write contetnt here' rows="6"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" id="">
              <option value="New">New</option>
              <option value="Offers">Offers</option>
              <option value="Juices">Juices</option>
              <option value="Shakes">Shakes</option>
              <option value="Cold Coffee">Cold Coffee</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pizza">Pizza</option>
              <option value="Chinese">Chinese</option>
              <option value="Pasta">Pasta</option>
              <option value="Meals">Meals</option>
              <option value="Extra">Extra</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="Number" onChange={onChangeHandler} value={data.price} name="price" placeholder='₹20' id="" />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>

      <form className='flex-col' onSubmit={onCouponSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Coupon name</p>
          <input onChange={onChangeHandler} value={data.coupon} type="text" name="coupon" placeholder='Type here' id="" />
        </div>
        <div className="add-price flex-col">
            <p>Coupon discount</p>
            <input type="Number" onChange={onChangeHandler} value={data.discount} name="discount" placeholder='₹20' id="" />
          </div>
        <button type='submit' className='add-btn'>ADD COUPON</button>
      </form>

    </div>
  )
}

export default Add
