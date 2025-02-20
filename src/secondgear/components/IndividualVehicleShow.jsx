import React,{useState,useEffect} from 'react'
import { API_URL } from '../api'
import { Link, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'


function IndividualVehicleShow() {
    const [IndividualVehicle,setIndividualVehicle] =useState([]);
     const[firmData,  setFirmData]=useState([]);
    const {paramvehicleid} = useParams()
    
 
    

     const IndividualVehicleHandler = async()=>{
        const response = await fetch(`${API_URL}/vehicle/${paramvehicleid}/get-indvehicle`)
        const ApifetchData = await response.json();
        setIndividualVehicle(ApifetchData.Getvehicle);
        console.log('datapi',ApifetchData);
     }




       const firmDataHandler = async(firmid)=>{

        if (!firmid) return;
        
         try {
          const response = await fetch(`${API_URL}/firm/${firmid}/get-firm`)
          const ApifetchData = await response.json();
          setFirmData(ApifetchData.firm);
          console.log("fetchdata",ApifetchData)
         } catch (error) {
          alert('failed to fetch the data');
          console.log(error)
         }
        }



    useEffect(()=>{
      
        IndividualVehicleHandler();
    

    },[paramvehicleid])



    useEffect(() => {
      if (IndividualVehicle && IndividualVehicle.Firm) {
          firmDataHandler(IndividualVehicle.Firm[0]); // Extracting firm ID correctly
      }
  }, [IndividualVehicle]);



   const booKslotHandler=()=>{
       alert('sorry this is under development stage');
   }

  return (
    // individualvehcle show section styling starts from line 1066 in app.css
       <>  
       <Sidebar/>
       <div className="backgroundind"> 
       <div className='individualvehicles'>
       
       <div className="vehiclesdata">
       <strong>VEHICLE NAME:</strong>{IndividualVehicle.vehicleName}
       <strong>VEHICLE COLOR:</strong>{IndividualVehicle.color}
       <strong>VEHICLE COMPANY:</strong>{IndividualVehicle.company}
       <strong>VEHICLE COST:</strong>{IndividualVehicle.cost}
       
       <strong>VEHICLE MODEL:</strong>{IndividualVehicle.model}
       <strong>REGISTRATION NUMBER:</strong> {IndividualVehicle.Registration}
       <strong>Category:</strong> {IndividualVehicle.bs_version} 
       <strong>Varient:</strong> {IndividualVehicle.varient}
       <strong>CONTACT:</strong> xyz 
       </div>
       
       <div className="individual">
       {firmData._id ? (
       <Link to={`/showroomvehiclemenu/${firmData._id}`}>
        {firmData.firmName}
       </Link>
        ) : (
        <h1>Loading showroom...</h1>
       )}
        <img src={`${API_URL}/uploads/${IndividualVehicle.image}`} alt={IndividualVehicle.vehicleName}/>
        <strong>DESCRIPTION:</strong>{IndividualVehicle.description} <br />
        
         <button onClick={booKslotHandler}>book slot for test drive</button>
        </div>

    </div>
    
    </div>
    </>
  )
}

export default IndividualVehicleShow