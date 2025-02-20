import React from 'react'
import Sidebar from './Sidebar';

function About() {
 return(
    // about section styling starts from line 1296 in app.css
    <div className="about-container">
        <Sidebar/>
      <h1>🚗 Welcome to Second Gear! 🔥</h1>
      <p>
        <strong>Second Gear</strong> is not just another second-hand car selling platform—it's your go-to hub for hassle-free buying and selling of pre-loved vehicles!
      </p>
      <ul>
        <li>🔹 <strong>Multi-Vendor Support:</strong> Multiple sellers can list their cars with ease.</li>
        <li>🔹 <strong>Detailed Listings:</strong> High-quality images, specifications, and history reports.</li>
        <li>🔹 <strong>Smart Filters:</strong> Find your perfect car with advanced search & filters.</li>
        <li>🔹 <strong>Secure Transactions:</strong> Safe and seamless buying experience.</li>
        <li>🔹 <strong>AI-Powered Recommendations:</strong> Smart suggestions based on your preferences.</li>
      </ul>
      <p>Looking to buy or sell a used car? <strong>Second Gear</strong> makes it smooth, fast, and fun! 🎉</p>
    </div>
 );
}

export default About