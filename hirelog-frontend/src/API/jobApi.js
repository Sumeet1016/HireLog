import api from "./api";
export const getJobs=(userId,page,size,sortBy,sortDir,status)=>{
    return api.get(`/api/users/${userId}/jobs`,{
        params:{
            page,
            size,
            sortBy,
            sortDir,
            status
        },
    });
};