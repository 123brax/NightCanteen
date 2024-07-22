import React from 'react'
import './Auth.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Auth = () => {
    const [currentLogin, setCurrentLogin] = useState(true)
    const navigate = useNavigate()
    const { url, setToken } = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        number: "",
        password: ""
    })

    function onChangeHandler(e) {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    async function onLogin(e) {
        e.preventDefault()
        let newUrl = url;
        if (currentLogin) {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("zestHeavenToken", response.data.token)
            toast.success("Successfully Logged In")
            window.location.reload()
        } else {
            alert(response.data.message)
        }
    }
    return (
        <div class={`auth-container ${currentLogin ? "" : "auth-sign-up-mode"}`}>
            <div class="auth-forms-container">
                <div class="auth-signin-signup">
                    <form action="#" class="auth-form auth-sign-in-form">
                        <h2 class="auth-title">Sign in</h2>
                        <div class="auth-input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Number" onChange={onChangeHandler} name="number" />
                        </div>
                        <div class="auth-input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={onChangeHandler} name="password" />
                        </div>
                        <input onClick={onLogin} type="submit" value="Login" class="auth-btn solid" />
                        <p class="auth-social-text">Or Sign in with social platforms</p>
                        <div class="auth-social-media">
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                    <form action="#" class="auth-form auth-sign-up-form">
                        <h2 class="auth-title">Sign up</h2>
                        <div class="auth-input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Name" onChange={onChangeHandler} name="name" />
                        </div>
                        <div class="auth-input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="text" placeholder="Number" onChange={onChangeHandler} name="number" />
                        </div>
                        <div class="auth-input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={onChangeHandler} name="password" />
                        </div>
                        <input onClick={onLogin} type="submit" class="auth-btn" value="Sign up" />
                        <p class="auth-social-text">Or Sign up with social platforms</p>
                        <div class="auth-social-media">
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="auth-social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="auth-panels-container">
                <div class="auth-panel auth-left-panel">
                    <div class="auth-content">
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button onClick={() => setCurrentLogin(false)} class="auth-btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src={assets.log} class="auth-image" alt="" />
                </div>
                <div class="auth-panel auth-right-panel">
                    <div class="auth-content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button onClick={() => setCurrentLogin(true)} class="auth-btn transparent" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src={assets.register} class="auth-image" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Auth
