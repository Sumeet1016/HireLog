import api from "./api";

export const updateJobStatus=(jobId,status)=>{
    return api.put(`/jobs/${jobId}/status`,{status});
}