import React ,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Homepageanimation from '../components/Homepageanimation'
import Contact from '../components/Contact'
import About from '../components/About'
import  Login  from '../components/Login'
import Register from '../components/Register'

const Landingpage = () => {
  const[ShowLogin,setShowLogin]=useState(false);
  const[ShowRegister,setShowRegister]=useState(false);
  const[ShowAbout,setShowAbout]=useState(true);
  const[ShowContact,setShowContact]=useState(true);
  const[showhomeanimation,setshowhomeanimation]=useState(true);
  const[hidelogREg ,sethidelogREg]=useState(false);

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(loginToken){
      showhidelogREgHandler();
    }

  },[])
  
  
  



  const showhidelogREgHandler =()=>{
    console.log("before",hidelogREg);
    sethidelogREg(true)
    console.log("after",hidelogREg);
  }

  const ShowhomeHandler = async()=>{
  
    setShowLogin(false);
    setShowRegister(false);
    setShowAbout(true);
    setShowContact(true);
    setshowhomeanimation(true);

  }


  const ShowLoginHandler =async()=>{
    setShowLogin(true);
    setShowRegister(false);
    setShowAbout(false);
    setShowContact(false);
    setshowhomeanimation(false);



  }

  const ShowRegisterHandler =async()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowAbout(false);
    setShowContact(false);
    setshowhomeanimation(false);

  }

  
  return (
    // landing section styling starts from line 335 in app.css
    <div className='landingpage'>
  
      {showhomeanimation && <Homepageanimation/> }
       {ShowAbout && <About/>}
       {ShowContact && <Contact/>}
       {ShowLogin && <Login  ShowhomeHandler={ ShowhomeHandler} />}
       {ShowRegister && <Register  ShowLoginHandler={ShowLoginHandler} />}
      <div className="navbar">
      <Navbar ShowLoginHandler={ShowLoginHandler} ShowRegisterHandler={ShowRegisterHandler} ShowLogin={ShowLogin} ShowRegister={ShowRegister}
      hidelogREg={hidelogREg}/> 
      <Sidebar ShowhomeHandler={ShowhomeHandler}/>
      </div>
       
      
  
    
    </div>
  )
}

export default Landingpage