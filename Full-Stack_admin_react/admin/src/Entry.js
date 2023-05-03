import React from 'react'
import './css/App.css'
import { useNavigate } from 'react-router-dom'


export default function Entry() {
    const navigate = useNavigate()

  return (
    <div className='entry-div'>
        <h1 onClick={()=> navigate('/login')}>Login</h1>
            <br/>
        <h2>or</h2>
            <br/>
        <h1 onClick={()=> navigate('/register')}>Register</h1>
    </div>
  )
}
