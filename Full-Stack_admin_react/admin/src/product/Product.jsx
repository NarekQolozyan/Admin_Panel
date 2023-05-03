import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import "../css/User.css"

export default function Product() {
  const navigate = useNavigate()
  const [value,setValue] = useState('');
  const [updateValue,setUpdateValue] = useState('')
  const [delete_id,setDeleteId] = useState('')

  
  return (
     <header className='header'>
        <div className='nav-bar'>
            <div className='getUsers div' onClick={ () => navigate('/adminPanel/product/createProduct') }>
                <h1>Create Products</h1>
            </div>
             <div className='getById div'>
                <h1>Get Product by Id</h1>
                <label>Id: <input value={value} onChange={(e) => setValue(e.target.value)}/></label>
                <button onClick={()=> navigate(`/adminPanel/product/getProduct/${value}`)}>Get</button>
            </div>
            <div className='updateUser div'>
                    <h1>Update Product</h1>
                <div className='row'>
                    <label>Id: </label>
                    <input onChange={(e)=> setUpdateValue(e.target.value)}/>
                    <button onClick={() => navigate(`/adminPanel/product/updateProduct/${updateValue}`)}>Update</button>
                </div>
            </div>
            <div className='deleteUser div'>
                <h1>Delete Product</h1>
                <label>Id: <input onChange={(e)=>setDeleteId(e.target.value)}/></label>
                <button onClick={()=>navigate(`/adminPanel/product/deleteProduct/${delete_id}`)}>Delete</button>
            </div>  
        </div>
    </header>
  )
}
