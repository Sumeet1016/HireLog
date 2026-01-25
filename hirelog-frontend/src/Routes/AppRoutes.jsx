import AddJob from "../Pages/AddJob";
import Jobs from "../Pages/Jobs";
import {Routes,Route} from "react-router-dom";
const AppRoutes=({jobs,addJob})=>{
 return (
    <Routes>
        <Route path="/" element={<Jobs jobs={jobs}/>}/>
        <Route path="/add-job" element={<AddJob addJob={addJob}/>}/>
    </Routes>
 )
}

export default AppRoutes;