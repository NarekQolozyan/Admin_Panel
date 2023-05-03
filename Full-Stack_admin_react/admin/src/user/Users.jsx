import React, { useState } from 'react'
import '../css/User.css'
import { useNavigate } from 'react-router-dom'
import { GetUsers, GetUserById, UpdateUser, DeleteUser} from './user_controller'

export default function Users() {
const [value,setValue] = useState('')
const [updateValue,setUpdateValue] = useState('')
const [delete_id,setDeleteId] = useState('')
const navigate = useNavigate()

  function get_user(){
    navigate('/adminPanel/users/getUsers')
        return <GetUsers/>
  } 
  function getUser_byId(){
    navigate(`/adminPanel/users/getUser/${value}`)
    return <GetUserById/>
  }
  function update_user(){
    navigate(`/adminPanel/users/updateUser/${updateValue}`)
    return <UpdateUser id={updateValue} />
  }
  function delete_user(){
    navigate(`/adminPanel/users/deleteUser/${delete_id}`)
    return <DeleteUser/>
  }
  return (
    <header className='header'>
        <div className='nav-bar'>
             <div className='getUsers div' onClick={ () => get_user() }>
                <h1>Get Users</h1>
            </div>
            <div className='getById div'>
                <h1>Get Users by Id</h1>
                <label>Id: <input value={value} onChange={(e) => setValue(e.target.value)}/></label>
                <button onClick={()=> getUser_byId()}>Get</button>
            </div>
            <div className='updateUser div'>
                    <h1>Update User</h1>
                <div className='row'>
                    <label>Id: </label>
                    <input onChange={(e)=> setUpdateValue(e.target.value)}/>
                    <button onClick={()=> update_user()}>Update</button>
                </div>
            </div>
            <div className='deleteUser div'>
                <h1>Delete User</h1>
                <label>Id: <input onChange={(e)=>setDeleteId(e.target.value)}/></label>
                <button onClick={()=>delete_user()}>Delete</button>
            </div> 
        </div>
    </header>
  )
}
