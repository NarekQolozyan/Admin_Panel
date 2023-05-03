import LoginForm from './LoginForm';
import {  Route, useNavigate, Routes } from "react-router-dom";
import Home from './Home';
import AdminPanel from './AdminPanel';
import Users from './user/Users';
import Product from './product/Product';  
import {GetUsers, GetUserById, UpdateUser, DeleteUser, CreateUser} from './user/user_controller';  
import {CreateProduct, GetProductById, UpdateProduct, DeleteProduct} from './product/product_controller';  
import UserPage from './user/UserPage'
import Entry from './Entry';
import Main from './Main';


export default function Router() {

  const navigate = useNavigate();

  return (

    <div>
    
    <Routes>
      
      <Route path='/' element={<Main/>}/>
      <Route path='/entry' element={<Entry/>}/>
      <Route path='/login' element={<LoginForm navigate={navigate}/>}/>
      <Route path='/register' element={<CreateUser/>}/>
      <Route path='/adminPage' element={<Home/>} />
      <Route path='/adminPanel' element={<AdminPanel/>} />
      <Route path='/adminPanel/users' element={<Users/>} />
      <Route path='/adminPanel/product' element={<Product/>} />
      <Route path='/adminPanel/users/getUsers' element={<GetUsers/>} /> 
      <Route path='/adminPanel/users/getUser/:id' element={<GetUserById/>} />
      <Route path='/adminPanel/users/updateUser/:id' element={<UpdateUser/>} />
      <Route path='/adminPanel/users/deleteUser/:id' element={<DeleteUser/>} />

      <Route path='/userPage' element={<UserPage/>}/>

      <Route path='/adminPanel/product/createProduct' element={<CreateProduct/>}/>
      <Route path='/adminPanel/product/getProducts' element={<UserPage/>} /> 
      <Route path='/adminPanel/product/getProduct/:id' element={<GetProductById/>} />
      <Route path='/adminPanel/product/updateProduct/:id' element={<UpdateProduct/>} />
      <Route path='/adminPanel/product/deleteProduct/:id' element={<DeleteProduct/>} />

    </Routes>
    </div>
  )
}
