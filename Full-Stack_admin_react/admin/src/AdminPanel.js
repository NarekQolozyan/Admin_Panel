import React from 'react'
import './css/AdminPanel.css'
import { useNavigate } from 'react-router-dom'

export default function AdminPanel() {
  const navigate = useNavigate()

  return (
    <div className='header'>
        <div className='users-div' onClick={() => navigate('/adminPanel/users')}>
            <h1  className='users'>Users</h1>
        </div>
        <div  onClick={() => navigate('/adminPanel/product')} className='products-div'>
            <h1 className='products'>Products</h1>
        </div>
    </div>
  )
}
