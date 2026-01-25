
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Jobs from './Pages/Jobs'
import AppRoutes from "./Routes/AppRoutes"
import { useState } from 'react'
function App() {
  const [jobs,setJobs]=useState([]);

  const addJob=(job)=>{
    setJobs((prev)=>[...prev,job]);
  };

  return <div>
    <Navbar/>
    <AppRoutes jobs={jobs} addJob={addJob}/>
    <Footer/>
    </div>
}

export default App
