import api from "./api";

export const updateJobStatus=(userId,jobId,status)=>{
    return api.put(`/jobs/${jobId}/status`,{status});
}