
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Jobs from './Pages/Jobs'
import AppRoutes from "./Routes/AppRoutes"
import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";

function App() {
  const [jobs,setJobs]=useState([]);

  const addJob=(job)=>{
    setJobs((prev)=>[...prev,job]);
  };

  return (
    <>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
