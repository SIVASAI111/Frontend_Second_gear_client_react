import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './navbar';
function Contact() {
  return (
    // // contact section styling starts from line 1233 in app.css
    <div className="contactcontainer">
      <Sidebar/>
      <div className="logo">
        <img src="/webdeveloper logo.jpeg" alt="Siva Sai Vallabhu" />
      </div>
      <div className="details">
        <h1>Siva Sai Vallabhu</h1>
        <p>Full-Stack Developer (MERN)</p>
      </div>
      <div className="contact">
        <p>📞 Contact No: <span>8374545255</span></p>
        <p>💻 Specialization: <span>Full-Stack (MERN)</span></p>
        <p>📧 E-mail: <span>sivasaiv111@gmail.com</span></p>
      </div>
      <div className="about">
        <p>🔹 Passionate full-stack developer skilled in building scalable and dynamic web applications using MongoDB, Express.js, React.js, and Node.js.</p>
        <p>🔹 Seeking job opportunities in both frontend and backend development to contribute to innovative projects and enhance my expertise.</p>
      </div>
    </div>
  );
}

export default Contact;
