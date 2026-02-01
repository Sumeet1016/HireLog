import api from "./api";

export const getJobs = (
  page = 0,
  size = 5,
  sortBy = "createdAt",
  sortDir = "desc",
  status,
) => {
  const params = {
    page,
    size,
    sortBy,
    sortDir,
  };

  if (status && status.trim() !== "") {
    params.status = status;
  }

  return api.get("/jobs", { params });
};

export const createJob = (jobData) => {
  return api.post("/jobs", jobData);
};

export const updateJobStatus = (jobId, status) => {
  return api.put(`/jobs/${jobId}/status`, { status });
};

export const deleteJob = (jobId) => {
  return api.delete(`/jobs/${jobId}`);
};
