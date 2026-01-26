import AddJob from "../Pages/AddJob";
import Jobs from "../Pages/Jobs";
import {Routes,Route} from "react-router-dom";

const AppRoutes=()=>{
 return (
    <Routes>
        <Route path="/" element={<Jobs/>}/>
        <Route path="/add-job" element={<AddJob/>}/>
    </Routes>
 )
}

export default AppRoutes;