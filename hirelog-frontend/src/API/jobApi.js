import api from "./api";
export const getJobs=(userId,page,size,sortBy,sortDir,status)=>{
    return api.get(`/api/jobs`,{
        params:{
            page,
            size,
            sortBy,
            sortDir,
            status
        },
    });
};