import React ,{useState} from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Link } from 'react-router-dom';


const Homepageanimation = () => {
  const [items, setItems] = useState([
    { id: 1, image: 'home-1.jpg', title: "Multi-Vendor Support", desc: "Multiple sellers can list their cars with ease" },
    { id: 2, image: 'home-2.jpg', title: "Detailed Listings", desc: "High-quality images, specifications, and history reports." },
    { id: 3, image: 'home-3.jpg', title: "Smart Filters:", desc: "Find your perfect car with advanced search & filters." },
    { id: 4, image: 'home-4.jpg', title: "Secure Transactions:", desc: "Safe and seamless buying experience." },
    { id: 5, image: 'home-5.jpg', title: "AI-Powered Recommendations:", desc: "Smart suggestions based on your preferences." },
  ]);

  // Function to move to the next slide
  const handleNext = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  // Function to move to the previous slide
  const handlePrev = () => {
    setItems((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
  };
  return (
    // homepage animation section styling starts from line 159 in app.css
    <div
      className="body">
      <main>
        <ul className="contslider">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="item"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="content">
                <h2 className="title">{item.title}</h2>
                <p className="descp">{item.desc}</p>
                <Link to={'/About'}><button>READ MORE</button></Link>
              </div>
            </li>
          ))}
        </ul>
        <nav className="navb">
          < ArrowCircleLeftIcon onClick={handlePrev} />
          <ArrowCircleRightIcon  onClick={handleNext} />
        </nav>
      </main>
    </div>
  )
}

export default Homepageanimation