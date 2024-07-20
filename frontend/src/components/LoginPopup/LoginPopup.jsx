import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
  const {url, setToken} = useContext(StoreContext)
  const[currentState, setCurrentState] = useState("Sign Up")
  const [data, setData] = useState({
    name:"",
    number:"",
    password: ""
  })

  function onChangeHandler(e) {
    const name = e.target.name
    const value = e.target.value

    setData(data=>({...data,[name]:value}))
  }

  async function onLogin(e) {
    e.preventDefault()
    let newUrl = url;
    if (currentState==="Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("zestHeavenToken", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:<input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='Your name' required id="" />}
            <input type="text" placeholder='Number without STD code' value={data.number} name='number' onChange={onChangeHandler} required id="" />
            <input type="password" placeholder='Password' value={data.password} name='password' onChange={onChangeHandler} required id="" />
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create account": "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required id="" />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login"?
            <p>Create a new account? <span onClick={()=> setCurrentState("Sign Up")}>Click here</span></p>
            : <p>Already have an account? <span onClick={()=> setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}
export default LoginPopup
