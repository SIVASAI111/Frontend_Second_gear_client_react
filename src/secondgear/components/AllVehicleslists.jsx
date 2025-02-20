import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import Loader from "./Loader";

const AllVehicleslists = () => {
  const [vehiclesData, setvehiclesData] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleSearch = () => {
    const matchedvehicles = vehiclesData.filter((vehicles) =>
      vehicles.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedvehicles.length === 0) {
      alert("Sorry, searched vehicle are not found.");
      setSearchQuery(""); // Clear input only when no results found
    } 
    else {
        const unmatchedvehicles = vehiclesData.filter((vehicles) =>
          !matchedvehicles.includes(vehicles)
        );
  
        // Set filtered data to show matched showrooms first, then unmatched showrooms
        setFilteredData([...matchedvehicles, ...unmatchedvehicles]);
        setSearchQuery(""); // Clear the search query after search
    }
  };

  





  
  useEffect(() => {
    const vendorFirmHandler = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/vehicle/all-vehicles`);
        const ApiFetchData = await response.json();
        setvehiclesData(ApiFetchData.allvehicles);
        setFilteredData(ApiFetchData.allvehicles || []);
      } catch (error) {
        alert("Failed to fetch data");
        console.error("Fetch error:", error);
      }finally {
        setIsLoading(false); 
      }
    };
    vendorFirmHandler();
  }, []);


  useEffect(() => {
    if (swiperInstance && vehiclesData.length > 0) {
      setTimeout(() => {
        swiperInstance.update(); // Refresh Swiper
        swiperInstance.slideTo(3); // Ensure it starts at the first slide
      }, 200); // Short delay ensures DOM is ready
    }
  }, [swiperInstance, vehiclesData]);

  // const slidesPerView = firmData.length >= 3 ? 3.5 : firmData.length;
  const slidesPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1.2;

 console.log('data',vehiclesData);
  
  return (
    // all vehicle  section styling starts from line 1221 in app.css
    <>
     <div >
      
      <Sidebar />
      
      </div> 
      {isLoading ? (
        <Loader />
      ) : (
        <>
    
      <section className="showroomsSlidingWindow">
      
      <h1>TOP VEHICLES LISTS</h1>
       <video autoPlay loop muted className="background-video">
        <source src="videos/vehiclesbackgroundvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={vehiclesData.length > slidesPerView + 1}  
          slidesPerView={slidesPerView}
          coverflowEffect={{
            rotate: -8,
            stretch: 0,
            depth: 150,
            modifier: 2,
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false}}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
          className="showroom-swiper"
        >
          
         
          {vehiclesData.map((item, index) => (
            <SwiperSlide key={index} className="showroom-slide">

             <Link to={`/individualvehicle/${item._id}`}>
              <div className="firmbox">
              <div className="firm-name">{item.vehicleName.toUpperCase()}
              
              </div>
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt={item.vehicleName}
                />
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Arrows */}
          
          <div className="swiper-controls">

          <button className="custom-nav-btn" onClick={() => swiperInstance?.slidePrev()}
            disabled={!swiperInstance} >
            <ArrowCircleLeftIcon fontSize="large" />
          </button>

          <div className="swiper-pagination"></div>

          <button className="custom-nav-btn" onClick={() => swiperInstance?.slideNext()}
            disabled={!swiperInstance} >
            <ArrowCircleRightIcon fontSize="large" />
          </button>
          
            </div>
        </div>
      </section>




      {/* section 2 */}

       <section className="vehicle-list">
  <div className="searchbar">
    <div className="showroomlistname">
      <strong>Vehicle List</strong>
    </div>
    <div className="searchbox">
    <input
            type="text"
            placeholder="Vehicle name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />


    <button onClick={handleSearch}>Search</button>
    </div>
  </div>

  <div className="showroomlistshows">
    {filteredData.map((vehicle, index) => (
      <div key={index} className="showroom_item">
        <Link to={`/individualvehicle/${vehicle._id}`}>
        <div className="flip-card">
          <div className="flip-card-inner">
            {/* Front Side - Image */}

            <div className="flip-card-front">
              <div className="showroom_name" >{vehicle.vehicleName.toUpperCase()}</div>
              <img src={`${API_URL}/uploads/${vehicle.image}`} alt={vehicle.vehicleName}
               />
              
            </div>


            {/* Back Side - Showroom Details */}
            
            <div className="flip-card-back">
              <strong>Showroom Name:</strong> {vehicle.Firm?.[0]?.firmName || "Loading..."}<br />
              <strong>VEHICLE NAME</strong> {vehicle.vehicleName} 
              <strong>COST:</strong> {vehicle.cost}
            </div>
          </div>
        </div>
          </Link>
      </div>
    ))}
  </div>
</section>
</>
)}

      </>
  );
};

export default AllVehicleslists;
