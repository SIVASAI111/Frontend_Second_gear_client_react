import React ,{useState}from 'react'
import { API_URL } from '../api.js';



function Login({ ShowhomeHandler  }) {
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
    const [loading, setLoading] = useState(false);
  
   const LoginHandler =async(e)=>{
      e.preventDefault();
    try {
        setLoading(true);
        const response= await fetch(`${API_URL}/user/login`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json();
     
        
        if(response.ok){
          alert('Login successfully')
        
         
          
        
          // localStorage.setItem('vendorname',vendorname);
          localStorage.setItem('username',data.Username)
          localStorage.setItem('loginToken',data.token)//soring the login token come from vendor controoler backend code
          setEmail('');
          setPassword('');
          
          ShowhomeHandler();
          setTimeout(() => {
            window.location.reload();
          }, 200);
        }
        else{
          alert("invalid credintial")
        }   
           
    }
     catch(error) {
      console.error(error);
      alert('login failed');
    }
    finally {
        setLoading(false);
      }
   }
  
   
  return (
    
  // start from line 1447
    <div className="login-container">
    <form className="login-form" onSubmit={LoginHandler}>
      <h3>User Login</h3>

      <label>Email</label>
      <input
        type="text"
        placeholder="Enter Your Registered Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

    <button type='submit' disabled={loading} >
    {loading ? 'Submitting...' : 'Submit'}
    </button>
    </form>
  </div>
  )
}

export default Login