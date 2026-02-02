const Footer = () => {
  return (
    <footer className="mt-auto border-top">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="fw-bold text-primary mb-3">
              <i className="bi bi-kanban me-2"></i>
              HireLog
            </h5>
            <p className="text-muted mb-4">
              Track your job applications journey. Stay organized and never miss
              an opportunity.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/sumeet-yadav-996101325"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit my LinkedIn profile"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a
                href="https://github.com/Sumeet1016"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit my GitHub profile"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
              <a
                href="mailto:sumeety08@gmail.com"
                className="text-secondary"
                title="Send me an email"
              >
                <i className="bi bi-envelope fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-6 col-lg-2 mb-4">
            <h6 className="fw-semibold mb-3">Product</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-2 mb-4">
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="fw-semibold mb-3">Stay Updated</h6>
            <p className="text-muted mb-3">
              Subscribe to get tips and updates on job hunting
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-outline-primary" type="button">
                Subscribe
              </button>
            </div>

            {/* Your personal info */}
            <div className="mt-4 pt-3 border-top">
              <p className="small text-muted mb-1">
                <i className="bi bi-person me-1"></i>
                Developed by Sumeet Yadav
              </p>
              <p className="small text-muted mb-0">
                <i className="bi bi-envelope me-1"></i>
                sumeety08@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-top pt-4 mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-muted mb-3 mb-md-0">
              © {new Date().getFullYear()} HireLog. All rights reserved.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-muted text-decoration-none small">
                Privacy Policy
              </a>
              <a href="#" className="text-muted text-decoration-none small">
                Terms of Service
              </a>
              <a href="#" className="text-muted text-decoration-none small">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Attribution line */}
          <div className="text-center mt-3">
            <p className="text-muted small">
              Connect with the developer:{" "}
              <a
                href="https://www.linkedin.com/in/sumeet-yadav-996101325"
                className="text-primary text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              •{" "}
              <a
                href="https://github.com/Sumeet1016"
                className="text-primary text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              •{" "}
              <a
                href="mailto:sumeety08@gmail.com"
                className="text-primary text-decoration-none"
              >
                Email
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
