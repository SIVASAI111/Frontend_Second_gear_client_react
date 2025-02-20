
import React ,{useState,useEffect}from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Navbar = ({ShowLoginHandler,ShowRegisterHandler,ShowRegister,ShowLogin,hidelogREg}) => {

  const [showuser,setshowuser]=useState('')

  useEffect(()=>{
      const username = localStorage.getItem('username')
      if (username){
        setshowuser(username);
      }
      
    },[])

  return (
    // navbar section styling starts from line 9 in app.css
    <div>
        <div className="navsec">
        <div className="companyname"> <h3>Second Gear</h3></div>
        <div className="userauth">
          { ! hidelogREg &&<>
            <span onClick={ShowLoginHandler}
            style={{            
              color: ShowLogin? 'blue' : '',          
            }}>Login</span>/
            <span onClick={ShowRegisterHandler}
            style={{            
              color:ShowRegister? 'gold' : '',          
            }}>Register</span>
            </>
            
            }
            
           {hidelogREg && <>
            <AccountCircleRoundedIcon/>{showuser}
           
           </>} 
          
            
            
        </div>
        </div>
    </div>
  )
}

export default Navbar