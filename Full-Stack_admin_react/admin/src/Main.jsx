import React from 'react';
import './css/Main.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

useEffect(() => {
    fetch('http://localhost:4175/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className='navBar'>
        <div className='block-1'>
          <h2>Home</h2>
          <h2>About Us</h2>
          <h2>Contact Us</h2>
          <h2>More Info</h2>
        </div>
        <div className='block-2'>
          <h3 onClick={()=> navigate('/login')}>Login</h3>
          <h3 onClick={() => navigate('/register')}>Register</h3>
        </div>
      </div>
    <div className='section'>
      {products && products.map(product => (
        <div key={product.id} className='block'>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <img src={product.img} width="150px" height="100px" alt="product images"/>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
    </div>

  );
}
