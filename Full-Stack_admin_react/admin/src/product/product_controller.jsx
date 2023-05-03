import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


function CreateProduct(){

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [img,setImg] = useState('')
    const [description,setDescription] = useState('')

    function hendleClick(){    
        fetch('http://localhost:4175/product_add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            price,
            img,
            description
        })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`Failed to create product: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
           })
        .catch(error => {
            console.error('Error creating product:', error);
        });
    }
    return(
        <div className="create-product">
            <h1>Create Products</h1>
            <input value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            <input value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>
            <input value={img} placeholder="Image" onChange={(e)=>setImg(e.target.value)}/>
            <textarea value={description} placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
            <button onClick={()=>hendleClick()}>Create Product</button>
        </div>    
    )
}


function GetProducts() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No JWT found in local storage');
        return;
      }
  
      fetch('http://localhost:4175/products', {
        headers: {
          'Authorization': `${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data.role==="admin") {
            throw new Error('You do not have permission to view user data');
          }
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><img src={product.img} width="150px" height="100px" alt="products images"/></td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }



  function GetProductById(){
    const { id } = useParams();
    const [getId, setId] = useState();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No JWT found in local storage');
        return;
      }
  
      fetch(`http://localhost:4175/get_product/${id}`, {
        headers: {
          'Authorization': `${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setId([data]);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }, [id]);
  
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {getId && getId.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><img src={product.img} width="150px" height="100px" alt="products images"/></td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }


  function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No JWT found in local storage');
        return;
      }
  
      fetch(`http://localhost:4175/get_product/${id}`, {
        headers: {
          'Authorization': `${token}`
        },
      })
        .then(response => {
            console.log(response)
          if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setProduct(data);
          setName(data.name);
          setPrice(data.price);
          setImage(data.image);
          setDescription(data.description);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    }, [id]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No JWT found in local storage');
        return;
      }
  
      fetch(`http://localhost:4175/update_product/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          name,
          price,
          img: image,
          description
        })
      })
        .then(response => {
            console.log('dsgsv')
            console.log(image)
          if (!response.ok) {
            throw new Error(`Failed to update product: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          alert("Product updated successfully");
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    };
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label><br/>
        <label>
          Price:
          <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label><br/>
        <label>
          Image:
           <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
        </label><br/>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </label>
        <button type="submit">Update Product</button>
      </form>
    );
  }
  
  
function DeleteProduct() {
  const { id } = useParams();

  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT found in local storage');
      return;
    }

    fetch(`http://localhost:4175/delete_product/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete user: ${response.statusText}`);
        }
        console.log(`Product ${id} has been deleted`);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });


  return (
    <div>
      <h2>Product deleted successfuly</h2>
    </div>
  );
}

  export { CreateProduct, GetProducts, GetProductById, UpdateProduct, DeleteProduct };
  