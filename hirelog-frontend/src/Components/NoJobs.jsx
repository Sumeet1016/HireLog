import { useNavigate } from "react-router-dom";

const NoJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <div className="card border-0 shadow-sm p-5">
            <div className="mb-4">
              <div className="rounded-circle bg-light d-inline-flex p-4 mb-3">
                <i className="bi bi-inbox fs-1 text-primary"></i>
              </div>
              <h3 className="fw-bold mb-3">No Applications Yet</h3>
              <p className="text-muted mb-4">
                Start tracking your job applications to stay organized during
                your job search journey. Add your first application to begin.
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                onClick={() => navigate("/add-job")}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Your First Job
              </button>

              <button
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                onClick={() => navigate("/tutorial")}
              >
                <i className="bi bi-play-circle me-2"></i>
                Watch Tutorial
              </button>
            </div>

            <div className="mt-5">
              <h6 className="text-muted mb-3">Tips to get started:</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <i className="bi bi-search text-primary mb-2 d-block fs-4"></i>
                    <h6 className="fw-semibold">Search Jobs</h6>
                    <p className="small text-muted mb-0">
                      Find opportunities on job boards
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <i className="bi bi-check2-square text-primary mb-2 d-block fs-4"></i>
                    <h6 className="fw-semibold">Track Applications</h6>
                    <p className="small text-muted mb-0">
                      Record every application you submit
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <i className="bi bi-bell text-primary mb-2 d-block fs-4"></i>
                    <h6 className="fw-semibold">Set Reminders</h6>
                    <p className="small text-muted mb-0">
                      Follow up with companies on time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoJobs;
