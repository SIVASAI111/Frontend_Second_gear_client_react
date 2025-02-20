import React,{useState,useEffect} from 'react'
import { API_URL } from '../api'
import { Link, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'



function IndividualShowroomvehiclelist() {
  const[vehiclesmenu ,setVehiclesMenu]=useState([])
  const[firmData,  setFirmData]=useState(null)
  const {paramfirmid} = useParams()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
   
  
  
  const handleSearch = () => {
    const matchedvehicles =vehiclesmenu.filter((vehicles) =>
      vehicles.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedvehicles.length === 0) {
      alert("Sorry, searched vehicle are not available in this showroom.");
      setSearchQuery(""); // Clear input only when no results found
    } 
    else {
        const unmatchedvehicles =vehiclesmenu.filter((vehicles) =>
          !matchedvehicles.includes(vehicles)
        );
  
        // Set filtered data to show matched showrooms first, then unmatched showrooms
        setFilteredData([...matchedvehicles, ...unmatchedvehicles]);
        setSearchQuery(""); // Clear the search query after search
    }
  };

    
  

  const VehicleMenuHandler = async() =>{
     try {
       const response = await fetch(`${API_URL}/vehicle/${paramfirmid}/get-vehicles`)
       const ApifetchData = await response.json();
       setVehiclesMenu(ApifetchData.vehicles);
       setFilteredData(ApifetchData.vehicles||[]);
      //  console.log("apidata",ApifetchData)
     } catch (error) {
      alert('failed to fetch the data');
      console.log(error)
     }
  }


  const firmDataHandler = async()=>{
   try {
    const response = await fetch(`${API_URL}/firm/${paramfirmid}/get-firm`)
    const ApifetchData = await response.json();
    setFirmData(ApifetchData.firm);
    console.log("fetchdata",ApifetchData)
   } catch (error) {
    alert('failed to fetch the data');
    console.log(error)
   }
  }



  useEffect(()=>{

  VehicleMenuHandler()
  firmDataHandler()

  },[paramfirmid])

  useEffect(() => {
    setFilteredData(vehiclesmenu); // Ensure filteredData is set when vehiclesmenu updates
  }, [vehiclesmenu]);


  return (
    // individual section styling starts from line 732 in app.css
    <>
    <div>   
      <Sidebar />
     </div>
      
     <div className="indshowroomdata">
  {!firmData ? (
    <h1>Loading showroom data...</h1>
  ) : (
    <>
      <strong>Showroom Name:</strong> <span>{firmData.firmName}</span>

      <div className="indshowroomdatabox">
        {/* Showroom Details */}
        <div className="indshowroom-details">
          <p>
            <strong>Location:</strong> <span>{firmData.location}</span>
          </p>
          <p>
            <strong>Offers:</strong> <span>{firmData.offer}</span>
          </p>
          <p>
            <strong>Category:</strong> <span>{firmData.category.join(", ")} Wheelers</span>
          </p>
        </div>

        {/* Showroom Image */}
        <div className="indshowroomimage">
          <img src={`${API_URL}/uploads/${firmData.image}`} alt={firmData.firmName} />
        </div>
      </div>
    </>
  )}
</div>
    











      <div className="showroom-content">
        {/* <h1>Showroom ID: {paramfirmid}</h1> */}
        <div>
           {filteredData.length > 0 ? (
            <section className="vehicle_list">
            <div className="vecsearchbar">
              <div className="veclistname">
                <strong>vehicle List</strong>
              </div>
              <div className="vecsearchbox">
            <input
            type="text"
            placeholder="Vehicle name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>


            <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          
            <div className="vehiclelistshows">
              {filteredData.map((vehicles, index) => (
                <div key={index} className="vehicle_item">
                 <Link to={`/individualvehicle/${vehicles._id}`}>
                  <div className="vehicle-flip-card">
                    <div className="vehicle-flip-card-inner">
                      {/* Front Side - Image */}
          
                      <div className="vehicle-flip-card-front">
                        <div className="vehicle_name" >{vehicles.vehicleName.toUpperCase()}</div>
                        <img src={`${API_URL}/uploads/${vehicles.image}`} alt={vehicles.vehicleName}
                         />
                        
                      </div>
          
          
                      {/* Back Side - Showroom Details */}
                      
                      <div className="vehicle-flip-card-back">
                        <strong>VEHICLE NAME:</strong> {vehicles.vehicleName} 
                        <strong>COLOR:</strong> {vehicles.color} 
                        <strong>PRICE:</strong> {vehicles.cost} <br />
                        TO get more details plz click it..
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          ) 
          
          : 
             
          (
            <>
            <div className="vecsearchbar">
              <div className="veclistname">
                <strong>vehicle List</strong>
              </div>
              <div className="vecsearchbox">
            <input
            type="text"
            placeholder="Vehicle name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>


            <button onClick={handleSearch}>Search</button>
              </div>
            </div>
            <h1>No vehicles available.</h1>
            </>
          )} 
        
        </div>
      </div>
    
  </>
  )
}  

export default IndividualShowroomvehiclelist