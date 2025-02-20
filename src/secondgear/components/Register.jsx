import React ,{useState} from 'react'
import {API_URL} from '../api.js'

function Register({ShowLoginHandler}) {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
  
    // Validation Logic
    const validateField = (field, value) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const lowercase = /[a-z]/g;
      const uppercase = /[A-Z]/g;
      
    

      

  
      if (!value.trim()) {
        return `${field} is required. 🚨`;
      }
  
      // Username Validation
      if (field === 'username' && value.length < 2) {
        return `⚠️ ${field} must be at least two characters.`;
      }
  
      // Email Validation
      if (field === 'email' && !emailPattern.test(value)) {
        return `❌ ${field} is not a valid email address.`;
      }
  
      // Password Validation
      if (field === 'password') {
        if (value.length < 5) return `${field} must be at least eight characters. 🔒`;
        if (!lowercase.test(value)) return `${field} must include at least one lowercase character. 🔡`;
        if (!uppercase.test(value)) return `${field} must include at least one uppercase character. 🔠`;
        
        
      }
  
      return '';
    };
  
    // Handle Input Changes
    const handleInputChange = (field, value) => {
      switch (field) {
        case 'username':
          setUserName(value);
          setError((prev) => ({ ...prev, username: validateField(field, value) }));
          break;
  
        case 'email':
          setEmail(value);
          setError((prev) => ({ ...prev, email: validateField(field, value) }));
          break;
  
        case 'password':
          setPassword(value);
          setError((prev) => ({ ...prev, password: validateField(field, value) }));
          break;
  
        default:
          break;
      }
    };
  
    // Form Submit Handler
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate all fields before submission
      const usernameError = validateField('username', username);
      const emailError = validateField('email', email);
      const passwordError = validateField('password', password);
  
      if (usernameError || emailError || passwordError) {
        setError({ username: usernameError, email: emailError, password: passwordError });
        return;
      }
  

  //sending data to data
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/user/Register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setUserName('');
          setEmail('');
          setPassword('');
          alert('User registered successfully!');
          ShowLoginHandler();
         
          
        }
         else {
          alert('failed email already exists. Please try again.');
        }
    
      }
     
      catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed');
      } finally {
        setLoading(false);
      }
    };


   




return (
  // // register section styling starts from line 1343 in app.css
  <div className="Registersection">
      
      <form  className='autFrom1' onSubmit={handleSubmit}>
      <h3>User Register</h3>

            {/* user name html file */}
           <label >username</label>
           <input type="text" placeholder='Enter your name' name='username' 
           onChange={(e) => handleInputChange('username', e.target.value)} value={username}/>
           {error.username && <div className="regerror">{error.username}</div>}


     
          {/*  user email */}
          <label>email</label>
          <input type="email" placeholder='Enter Your Email' name='email'
          onChange={(e) => handleInputChange('email', e.target.value)} value={email}/>
          {error.email && <div className="regerror">{error.email}</div>}


          {/*user  password */}
          <label>pasword</label>
          <input type="password" placeholder='Enter Your Password' name='password'
           onChange={(e) => handleInputChange('password', e.target.value)} value={password}/>
          {error.password && <div className="regerror">{error.password}</div>} 


          <div className="regbtnsubmit">
          <button type='submit' disabled={loading} >
          {loading ? 'Submitting...' : 'Submit'}
          </button>

      </div>
      <br />
      </form>
  </div>

)
}

export default Register