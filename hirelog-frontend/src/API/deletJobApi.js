import api from "./api";

export const deleteJob=(userId,jobId)=>{
    return api.delete(`/api/users/${userId}/jobs/${jobId}`)
};

