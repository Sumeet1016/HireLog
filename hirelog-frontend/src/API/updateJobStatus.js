import api from "./api";

export const updateJobStatus=(userId,jobId,status)=>{
    return api.put(`/api/users/${userId}/jobs/${jobId}/status`,{status});
}