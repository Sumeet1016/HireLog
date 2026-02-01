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
              <a href="#" className="text-secondary">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-secondary">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-secondary">
                <i className="bi bi-github fs-5"></i>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
