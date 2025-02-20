import React from 'react'
import Landingpage from './secondgear/pages/Landingpage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import IndividualShowroomvehiclelist from './secondgear/components/IndividualShowroomvehiclelist'
import Showroomlists from './secondgear/components/Showroomlists'
import IndividualVehicleShow from './secondgear/components/IndividualVehicleShow'
import AllVehicleslists from './secondgear/components/AllVehicleslists'
import Contact from './secondgear/components/Contact'
import About from './secondgear/components/About'
import Account from './secondgear/components/Account'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/showroomvehiclemenu/:paramfirmid' element={<IndividualShowroomvehiclelist/>}/>
        <Route path='/showroomlists' element={<Showroomlists/>}/>
        <Route path='/individualvehicle/:paramvehicleid' element={<IndividualVehicleShow/>}/>
        <Route path='/AllVehicleslists' element={<AllVehicleslists/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/account' element={<Account/>}/>

      </Routes>
      
      
    </div>
  )
}

export default App