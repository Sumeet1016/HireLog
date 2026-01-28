import api from "./api";

export const updateJobStatus=(userId,jobId,status)=>{
    return api.put(`/api/jobs/${jobId}/status`,{status});
}