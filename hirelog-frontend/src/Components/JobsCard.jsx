import { useState, useEffect } from "react";
import { deleteJob } from "../API/deletJobApi";
import { updateJobStatus } from "../API/updateJobStatus";

const JobsCard = ({ job, userId, onDelete, onStatusUpdate }) => {
  const [status, setStatus] = useState(job.status);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setStatus(job.status);
  }, [job.status]);

  const handleDelete = async () => {
    if (
      !window.confirm("Are you sure you want to delete this job application?")
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteJob(userId, job.id);
      onDelete(job.id);
    } catch (error) {
      console.log("Failed to Delete", error);
      alert("Failed to delete job");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await updateJobStatus( job.id, newStatus);
      onStatusUpdate(res.data);
    } catch (err) {
      console.log(err);
      alert("Status update failed");
      setStatus(job.status);
    } finally {
      setLoading(false);
    }
  };

  // Get initials for company logo
  const getCompanyInitials = (companyName) => {
    return companyName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "status-applied";
      case "INTERVIEW":
        return "status-interview";
      case "OFFER":
        return "status-offer";
      case "REJECTED":
        return "status-rejected";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="job-card card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        {/* Header with Company */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="company-logo">
              {getCompanyInitials(job.companyName)}
            </div>
            <div>
              <h5 className="card-title fw-bold mb-1">{job.companyName}</h5>
              <p className="text-muted mb-0 small">
                <i className="bi bi-geo-alt me-1"></i>
                {job.location}
              </p>
            </div>
          </div>

          <span className={`status-badge ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Job Title */}
        <h6 className="fw-semibold mb-2">
          <i className="bi bi-briefcase me-2 text-primary"></i>
          {job.jobTitle}
        </h6>

        {/* Applied Date */}
        <div className="d-flex align-items-center text-muted small mb-3">
          <i className="bi bi-calendar3 me-2"></i>
          Applied on {formatDate(job.appliedDate || job.createdAt)}
        </div>

        {/* Notes Section */}
        {job.notes && (
          <div className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-journal-text me-2 text-primary"></i>
              <span className="fw-semibold small">Notes</span>
            </div>
            <p className="card-text text-muted small mb-0 bg-light p-3 rounded">
              {job.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <div className="flex-grow-1 me-3">
            <select
              value={status}
              onChange={handleStatusChange}
              disabled={loading || isDeleting}
              className="form-select form-select-sm"
              style={{ maxWidth: "140px" }}
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </>
              )}
            </button>

            <button className="btn btn-outline-primary btn-sm">
              <i className="bi bi-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
