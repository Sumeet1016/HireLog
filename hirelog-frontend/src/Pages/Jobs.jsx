import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../API/jobApi";
import JobCard from "../Components/JobsCard";
import NoJobs from "../Components/NoJobs";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(6); // ✅ Mobile-optimized: 6 items per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    offers: 0,
    interviews: 0,
    applied: 0,
    rejected: 0,
  });

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getJobs(
        page,
        pageSize,
        sortBy,
        sortDir,
        status || undefined,
      );
      const jobsData = res.data.content;
      setJobs(jobsData);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements || 0);

      if (page === 0 && !status) {
 
        const offers = jobsData.filter((j) => j.status === "OFFER").length;
        const interviews = jobsData.filter(
          (j) => j.status === "INTERVIEW",
        ).length;
        const applied = jobsData.filter((j) => j.status === "APPLIED").length;
        const rejected = jobsData.filter((j) => j.status === "REJECTED").length;

        setStats({
          total: res.data.totalElements,
          offers,
          interviews,
          applied,
          rejected,
        });
      }
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error("Fetch jobs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, sortBy, sortDir, status]);

  useEffect(() => {
    setPage(0);
  }, [sortBy, sortDir, status]);

  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    
    setTotalElements((prev) => prev - 1);
    if (jobs.length === 1 && page > 0) {
      setPage(page - 1);
    }
  };

  const handleStatusUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    );
  };

  const getDisplayRange = () => {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, totalElements);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  const getPageNumbers = () => {
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    const pages = [];

    let startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageJump = (pageNum) => {
    if (pageNum >= 0 && pageNum < totalPages) {
      setPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h2 fw-bold mb-1" style={{ marginTop: "30px" }}>
            My Applications
          </h1>
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

      {!loading && page === 0 && !status && totalElements > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md">
            <div className="card border-0 bg-primary bg-opacity-10 h-100">
              <div className="card-body py-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary text-white p-2 me-3">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.total}</h5>
                    <small className="text-muted">Total</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md">
            <div className="card border-0 bg-success bg-opacity-10 h-100">
              <div className="card-body py-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success text-white p-2 me-3">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.offers}</h5>
                    <small className="text-muted">Offers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md">
            <div className="card border-0 bg-warning bg-opacity-10 h-100">
              <div className="card-body py-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-warning text-white p-2 me-3">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.interviews}</h5>
                    <small className="text-muted">Interviews</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md">
            <div className="card border-0 bg-info bg-opacity-10 h-100">
              <div className="card-body py-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-info text-white p-2 me-3">
                    <i className="bi bi-send"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.applied}</h5>
                    <small className="text-muted">Applied</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md">
            <div className="card border-0 bg-danger bg-opacity-10 h-100">
              <div className="card-body py-3">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-danger text-white p-2 me-3">
                    <i className="bi bi-x-circle"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{stats.rejected}</h5>
                    <small className="text-muted">Rejected</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold small mb-1">
                <i className="bi bi-sort-down me-1"></i>
                Sort By
              </label>
              <select
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Date Applied</option>
                <option value="companyName">Company Name</option>
                <option value="jobTitle">Job Title</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold small mb-1">
                <i className="bi bi-funnel me-1"></i>
                Status
              </label>
              <select
                className="form-select form-select-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Applications</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold small mb-1">
                <i className="bi bi-arrow-down-up me-1"></i>
                Order
              </label>
              <select
                className="form-select form-select-sm"
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value)}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-4"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="loading-spinner"></div>
          <p className="mt-3 text-muted">Loading your applications...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && !error && <NoJobs />}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 && (
        <>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div className="mb-2 mb-md-0">
              <span className="text-muted small">
                <i className="bi bi-list-check me-1"></i>
                Showing {start} to {end} of {totalElements} applications
              </span>
            </div>
            <div className="text-muted small">
              Page {page + 1} of {totalPages}
            </div>
          </div>

          <div className="row g-4">
            {jobs.map((job) => (
              <div className="col-12 col-md-6 col-lg-6" key={job.id}>
                <JobCard
                  job={job}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Enhanced Pagination - Mobile Optimized */}
      {totalPages > 1 && !loading && (
        <div className="mt-5">
          {/* Mobile: Simple Prev/Next with Load More */}
          <div className="d-block d-md-none">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handlePageJump(page - 1)}
                disabled={page === 0}
              >
                <i className="bi bi-chevron-left me-1"></i>
                Previous
              </button>

              <span className="text-muted small">
                {page + 1} / {totalPages}
              </span>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handlePageJump(page + 1)}
                disabled={page === totalPages - 1}
              >
                Next
                <i className="bi bi-chevron-right ms-1"></i>
              </button>
            </div>

            {/* Load More Button for Mobile */}
            {page < totalPages - 1 && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePageJump(page + 1)}
                >
                  <i className="bi bi-arrow-down-circle me-2"></i>
                  Load More
                </button>
                <small className="d-block text-muted mt-2">
                  {end} of {totalElements} shown
                </small>
              </div>
            )}
          </div>

          {/* Desktop: Full Pagination */}
          <div className="d-none d-md-block">
            <nav aria-label="Job applications pagination">
              <ul className="pagination justify-content-center">
                {/* First Page */}
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageJump(0)}
                    disabled={page === 0}
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                </li>

                {/* Previous Page */}
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageJump(page - 1)}
                    disabled={page === 0}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum) => (
                  <li
                    key={pageNum}
                    className={`page-item ${page === pageNum ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageJump(pageNum)}
                    >
                      {pageNum + 1}
                    </button>
                  </li>
                ))}

                {/* Next Page */}
                <li
                  className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageJump(page + 1)}
                    disabled={page === totalPages - 1}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>

                {/* Last Page */}
                <li
                  className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageJump(totalPages - 1)}
                    disabled={page === totalPages - 1}
                  >
                    <i className="bi bi-chevron-double-right"></i>
                  </button>
                </li>
              </ul>
            </nav>

            {/* Quick Jump for Desktop */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <span className="me-2 text-muted small">Go to page:</span>
              <div className="input-group" style={{ width: "140px" }}>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="1"
                  max={totalPages}
                  defaultValue={page + 1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const newPage = parseInt(e.target.value) - 1;
                      handlePageJump(newPage);
                    }
                  }}
                />
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector("input");
                    const newPage = parseInt(input.value) - 1;
                    handlePageJump(newPage);
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
