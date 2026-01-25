import {useState} from "react";
import JobsCard from "../Components/JobsCard";
import NoJobs from "../Components/NoJobs";
const Jobs=({jobs})=>{
   
    return <div>
        {jobs.length===0 && <NoJobs/>}
        {jobs.map((job)=>(
            <JobsCard key={job.id} job={job}/>
        ))}
    </div>
}

export default Jobs;