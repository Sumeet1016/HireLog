import {useState} from "react";
import JobsCard from "./JobsCard";
import NoJobs from "./NoJobs";
const Jobs=()=>{
    const [jobs, setJobs] = useState([
      {
        id: 1,
        name: "Google",
        title: "SDE_1",
        location: "Mumbai",
        appliedon: "01/01/2026",
        notes: "This is for Trial Purpose Nothing else",
      },
      {
        id: 2,
        name: "Amazon",
        title: "SDE_1",
        location: "Banglore",
        appliedon: "01/07/2026",
        notes: "This is for more trial",
      },
    ]);
    return <div>
        {jobs.length===0 && <NoJobs/>}
        {jobs.map((job)=>
            <JobsCard key={job.id} job={job}/>
        )}
    </div>
}

export default Jobs;