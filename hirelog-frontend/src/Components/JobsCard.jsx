import { useState } from "react";
import { deleteJob } from "../API/jobApi";
import { updateJobStatus } from "../API/updateJobStatus";

const JobsCard=({job,userId,onDelete,onStatusUpdate})=>{

  const[status,setStatus]=useState(job.status);
  const[loading,setLoading]=useState(false);
  
const handleDelete=async()=>{
  try{
    await deleteJob(userId,job.id);
    onDelete(job.id);
  }
  catch(error){
    console.log("Failed to Delete",error);
    alert("Failed to delete job");
  }
};

const handleStatusChange=async(e)=>{

  const newStatus=e.target.value;
  setStatus(newStatus);
  setLoading(true);

  try{
   const res= await updateJobStatus(userId,job.id,newStatus);
    onStatusUpdate(res.data);
  }
  catch(err){
    console.log(err);
    alert("Status update failed");
    setStatus(job.status);
  }finally{
    setLoading(false);
  }
}
    return (
      <div className="card">
        <div className="card-body">
          <div className="companyRow">
            <h5 className="card-title ">{job.companyName}</h5>
            <h5 className="card-title ">{job.status}</h5>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {job.jobTitle}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {job.location}
          </h6>
          <br />
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Applied on: {job.appliedDate}
          </h6>
          <div className="notesSection">
            <h6>Notes:</h6>
            <p className="card-text">{job.notes}</p>
          </div>
          <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

          <select
            value={status}
            onChange={handleStatusChange}
            disabled={loading}
            className="border p-1 mt-2"
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
    );
}

export default JobsCard; 