import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo_dark} alt="" />
            <p>Freshly squeezed juices, bursting with flavor and nutrients.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 733 998 0606</li>
                <li>zestheaven@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2023 © Zest Heaven - All Right Reserved.
      </p>
    </div>
  )
}
import './Footer.css'
import { assets } from '../../assets/assets'

export default Footer
