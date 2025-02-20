import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import TimeToLeaveRoundedIcon from '@mui/icons-material/TimeToLeaveRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// import { Link } from 'react-router-dom';
import {Link, useNavigate } from 'react-router-dom';


const Sidebar = ({ShowhomeHandler}) => {
  const navigate = useNavigate();


  const LogoutHandler=()=>{
    const username = localStorage.getItem('username')
    const logintoken=localStorage.getItem('loginToken');
    
    if(!logintoken){
        // alert("please login");
        navigate('/');
        alert("please login");
        ShowLoginHandler();
        

    }
    else{
    let result;
    if(username){
     result = confirm (`hello ${username} Are you sure ? want to logout`);
    }
    else{
     result = confirm (`hello sir/madam Are you sure ? want to logout`);
    }
    if(result){
    localStorage.removeItem('loginToken');
    localStorage.removeItem('username');
    alert("sucessfully log out")
    // sethidelogREg(false);
    navigate('/');

    setTimeout(() => {
      window.location.reload();
    }, 100);

    }
  }
  }

  return ( 
    // sidebar section styling starts from line 32 in app.css
    <div className="sidebarsection">   
        <ul className='menu-items'>
        
        
            <li onClick={ShowhomeHandler}><Link to={`/`} className='item_icon'><HomeRoundedIcon/></Link>
            <span className='item_name'>Home</span></li>

            <li><Link to={`/showroomlists`} className='item_icon' ><WarehouseRoundedIcon/></Link>
            <span className='item_name'>Showroom</span></li> 

            <li><Link to={'/AllVehicleslists'} className='item_icon'><TimeToLeaveRoundedIcon/></Link>
            <span className='item_name'>Cars</span></li>  

            <li><Link to={'/account'} className='item_icon'><AccountCircleRoundedIcon/></Link>
            <span className='item_name'>Account</span></li>

            <li><Link to={'/About'} className='item_icon'><InfoRoundedIcon/></Link>
            <span className='item_name'>About</span></li>

            <li><Link to={'/contact'} className='item_icon'><ContactPageRoundedIcon/></Link>
            <span className='item_name'>Contact</span></li>
            
            <li><span className='item_icon' onClick={LogoutHandler}><LogoutRoundedIcon/></span>
            <span className='item_name'>Logout</span></li>
 

        
        </ul>
    </div>
  )
}

export default Sidebar