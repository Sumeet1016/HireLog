import {useEffect, useState} from "react";
import JobsCard from "../Components/JobsCard";
import NoJobs from "../Components/NoJobs";
import api from "../API/api";
import { updateJobStatus } from "../API/updateJobStatus";
const Jobs=()=>{

    const[jobs,setJobs]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");

    useEffect(()=>{
        fetchJobs();
    },[]);

    const handleDelete=(jobId)=>{
        setJobs((prev)=>prev.filter(job=>job.id!==jobId));
    }

    const handleStatusUpdate=(updateJobStatus)=>{
        setJobs((prev)=>prev.map((job)=>job.id===updateJobStatus.id?updateJobStatus:job));
    }

    const fetchJobs=async()=>{
        try{
            const res = await api.get("/api/users/1/jobs");
            setJobs(res.data.content );
        }
        catch(err){
            console.error("Fetch jobs error",err)
        }
        finally{
            setLoading(false);
        }
    };

    if(loading){
        return <p className="text-center mt-10">Loading....</p>;
    }

    if(error){
        
        return (<p className="text-center text-red-500 mt-10">{error}</p>
    );
    }
   
    return <div>
        {jobs.length===0 && <NoJobs/>}
        {jobs.map((job)=>(
            <JobsCard key={job.id} job={job}
            userId={1}  
            onDelete={handleDelete}
            onStatusUpdate={handleStatusUpdate}
            />
        ))}
    </div>
}

export default Jobs;