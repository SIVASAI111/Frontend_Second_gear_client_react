import React from 'react'

function Loader() {
  return (
    <div className="loader-container">
      <div className="car-loader">
        <img src="/carloader.gif" alt="Loading..." />
         <h1>LOADING...</h1>
      </div>
    </div>
  )
}

export default Loader