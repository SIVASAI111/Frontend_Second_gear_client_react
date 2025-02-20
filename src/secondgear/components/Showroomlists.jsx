

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


const Showroomlists = () => {
  const [firmData, setFirmData] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  
  const handleSearch = () => {
    const matchedShowrooms = firmData.filter((showroom) =>
      showroom.firmName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedShowrooms.length === 0) {
      alert("Sorry, searched showroom not found.");
      setSearchQuery(""); // Clear input only when no results found
    } 
    else {
        const unmatchedShowrooms = firmData.filter((showroom) =>
          !matchedShowrooms.includes(showroom)
        );
  
        // Set filtered data to show matched showrooms first, then unmatched showrooms
        setFilteredData([...matchedShowrooms, ...unmatchedShowrooms]);
        setSearchQuery(""); // Clear the search query after search
    }
  };

  




  useEffect(() => {
    const vendorFirmHandler = async () => {
      try {
        const response = await fetch(`${API_URL}/firm/all-firms`);
        const ApiFetchData = await response.json();
        setFirmData(ApiFetchData.firms || []);
        setFilteredData(ApiFetchData.firms || []);
      } catch (error) {
        alert("Failed to fetch data");
        console.error("Fetch error:", error);
      }
    };
    vendorFirmHandler();
  }, []);


  useEffect(() => {
    if (swiperInstance && firmData.length > 0) {
      setTimeout(() => {
        swiperInstance.update(); // Refresh Swiper
        swiperInstance.slideTo(3); // Ensure it starts at the first slide
      }, 200); // Short delay ensures DOM is ready
    }
  }, [swiperInstance, firmData]);

  // const slidesPerView = firmData.length >= 3 ? 3.5 : firmData.length;
  const slidesPerView = window.innerWidth > 1024 ? 3.5 : window.innerWidth > 768 ? 2.5 : 1.2;






  
  return (
    <>
    {/* // showroom lists section-1 styling starts from line 359 in app.css */}
     <div >
      
      <Sidebar />
      
      </div> 
    
      <section className="showroomsSlidingWindow">
      
      <h1>TOP SHOWROOMS</h1>
       <video autoPlay loop muted className="background-video">
        <source src="videos/backgroundvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={firmData.length > slidesPerView + 1}  
          slidesPerView={slidesPerView}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2,
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false}}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
          className="showroom-swiper"
        >
          
         
          {firmData.map((item, index) => (
            <SwiperSlide key={index} className="showroom-slide">

             <Link to={`/showroomvehiclemenu/${item._id}`}>
              <div className="firmbox">
              <div className="firm-name">{item.firmName.toUpperCase()}
              
              </div>
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt={item.firmName}
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




      {/* section 2  for line 562*/}

       <section className="showroom_list">
  <div className="searchbar">
    <div className="showroomlistname">
      <strong>Showroom List</strong>
    </div>
    <div className="searchbox">
    <input
            type="text"
            placeholder="Showroom name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />


    <button onClick={handleSearch}>Search</button>

    </div>
  </div>

  <div className="showroomlistshows">
    {filteredData.map((showroom, index) => (
      <div key={index} className="showroom_item">
        <Link to={`/showroomvehiclemenu/${showroom._id}`}>
        <div className="flip-card">
          <div className="flip-card-inner">
            {/* Front Side - Image */}

            <div className="flip-card-front">
              <div className="showroom_name" >{showroom.firmName.toUpperCase()}</div>
              <img src={`${API_URL}/uploads/${showroom.image}`} alt={showroom.firmName}
               />
              
            </div>


            {/* Back Side - Showroom Details */}
            
            <div className="flip-card-back">
              <strong>Showroom Name:</strong> {showroom.firmName} <br />
              <strong>Location:</strong> {showroom.location} 
              <strong>Offers:</strong> {showroom.offer}
            </div>
          </div>
        </div>
          </Link>
      </div>
    ))}
  </div>
</section>


      </>
  );
};

export default Showroomlists;
