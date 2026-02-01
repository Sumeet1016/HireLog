import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../API/jobApi";

const AddJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    notes: "",
  });

  // Check authentication before rendering
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token and check
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Your session has expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      // This calls POST /jobs (correct according to your controller)
      await createJob(form);
      navigate("/jobs");
    } catch (err) {
      console.error("Add job error:", err);

      // Check error type
      if (err.response?.status === 401) {
        alert("Authentication failed. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(
          err.response?.data?.message || "Failed to add job. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <div className="form-container">
            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-link text-decoration-none p-0 me-3"
                onClick={() => navigate("/jobs")}
              >
                <i className="bi bi-arrow-left fs-5"></i>
              </button>
              <h2 className="mb-0 fw-bold">Track New Application</h2>
            </div>

            <p className="text-muted mb-4">
              Add details of the job you applied to
            </p>

            <form onSubmit={handleSubmit}>
              {[
                {
                  field: "companyName",
                  label: "Company Name",
                  icon: "bi-building",
                },
                {
                  field: "jobTitle",
                  label: "Job Title / Role",
                  icon: "bi-briefcase",
                },
                { field: "location", label: "Location", icon: "bi-geo-alt" },
                {
                  field: "notes",
                  label: "Notes (Optional)",
                  icon: "bi-sticky",
                },
              ].map(({ field, label, icon }) => (
                <div className="mb-4" key={field}>
                  <label className="form-label fw-semibold">
                    <i className={`bi ${icon} me-2`}></i>
                    {label}
                  </label>
                  {field === "notes" ? (
                    <textarea
                      name={field}
                      className="form-control"
                      value={form[field]}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Add any additional notes about this application..."
                    />
                  ) : (
                    <input
                      name={field}
                      className="form-control"
                      value={form[field]}
                      onChange={handleChange}
                      required
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <div className="d-flex gap-3 mt-5">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-grow-1"
                  onClick={() => navigate("/jobs")}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-grow-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Save Job
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
