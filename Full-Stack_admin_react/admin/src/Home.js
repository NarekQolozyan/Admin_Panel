import React from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    
    const navigate = useNavigate()

  return (
    <div className='navbar'>
        <div className='navbar-option'>
            <h1 onClick={()=> navigate("/adminPanel")}>Admin's panel</h1>
            <h1 onClick={()=> navigate("/adminPanel/product/getProducts")}>Products</h1>
        </div>
        <div>
            <img src='https://static.vecteezy.com/system/resources/previews/010/925/820/original/colorful-welcome-design-template-free-vector.jpg' alt='welcome' className='welcomeImg'/>
            <h1 className='welcome-word'>Dear Admin</h1>
        </div>
    </div>
  )
}
