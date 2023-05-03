import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/User.css'
function CreateUser(){

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')

  function hendleClick(){    
      fetch('http://localhost:4175/user_register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: name,
          password
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
      if(name===""){
       return alert('Please enter username')
      }
      if(password===""){
        return alert('Please enter password')
      }
      alert('Congratulations you successfuly registered. Go back and log in.')
  }
  return(
      <div className="register-form">
          <h1>Register</h1>
          <input value={name} placeholder="Username" onChange={(e)=>setName(e.target.value)} required />
          <input value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
          <button onClick={()=>hendleClick()} className="sumbit">Sign Up</button>
      </div>    
  )
}


function GetUsers() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No JWT found in local storage');
        return;
      }
  
      fetch('http://localhost:4175/users', {
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
          setUsers(data);
          
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);
    return (
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Userame</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }



function GetUserById(){
  const { id } = useParams();
  const [getId, setId] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT found in local storage');
      return;
    }

    fetch(`http://localhost:4175/get_user/${id}`, {
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
        setId(data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {getId && getId.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
        </tr>))
          }
      </tbody>
    </table>
  );
}


function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT found in local storage');
      return;
    }

    fetch(`http://localhost:4175/get_user/${id}`, {
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
        setUser(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT found in local storage');
      return;
    }

    fetch(`http://localhost:4175/update_user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`
      },
      body: JSON.stringify({
        username,
        password,
        role
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      alert("User updated successfuly")
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Role:
        <input value={role} onChange={(e) => setRole(e.target.value)}/>
      </label>
      <button type="submit">Update User</button>
    </form>
  );
}

function DeleteUser() {
  const { id } = useParams();

  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No JWT found in local storage');
      return;
    }

    fetch(`http://localhost:4175/delete_user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete user: ${response.statusText}`);
        }
        console.log(`User ${id} has been deleted`);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });


  return (
    <div>
      <h2>User deleted successfuly</h2>
    </div>
  );
}

  export {CreateUser, GetUsers, GetUserById, UpdateUser, DeleteUser };
  