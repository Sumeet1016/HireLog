import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../API/jobApi";
import JobCard from "../Components/JobsCard";
import NoJobs from "../Components/NoJobs";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [status, setStatus] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    const res = await getJobs(page, 6, sortBy, sortDir, status || undefined);
    setJobs(res.data.content);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page, sortBy, sortDir, status]);

  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handleStatusUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev
        .map((job) => (job.id === updatedJob.id ? updatedJob : job))
        .filter((job) => !status || job.status === status),
    );
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">My Applications</h1>
          <p className="text-muted mb-0">
            Track all your job applications in one place
          </p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => navigate("/add-job")}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Job
        </button>
      </div>

      {/* Filter Section */}
      <div className="filter-section mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Sort By</label>
            <select
              className="form-select"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Date Applied</option>
              <option value="companyName">Company Name</option>
              <option value="jobTitle">Job Title</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                const newStatus = e.target.value;
                setPage(0);
                setStatus(newStatus);
              }}
            >
              <option value="">All Status</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Order</label>
            <select
              className="form-select"
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value)}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setStatus("");
                setSortBy("createdAt");
                setSortDir("desc");
                setPage(0);
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="loading-spinner"></div>
          <p className="mt-3 text-muted">Loading your applications...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && <NoJobs />}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 && (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-lg-6" key={job.id}>
              <JobCard
                job={job}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex gap-2 align-items-center">
            <button
              className="pagination-btn"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <i className="bi bi-chevron-left"></i> Previous
            </button>

            <div className="mx-3">
              <span className="fw-semibold">
                Page {page + 1} of {totalPages}
              </span>
              <span className="text-muted ms-2">
                ({jobs.length} applications)
              </span>
            </div>

            <button
              className="pagination-btn"
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              Next <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
