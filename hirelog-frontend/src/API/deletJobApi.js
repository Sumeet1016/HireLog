import api from "./api";

export const deleteJob=(userId,jobId)=>{
    return api.delete(`/api/jobs/${jobId}`)
};

