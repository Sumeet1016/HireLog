import api from "../API/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      if (!token) {
        alert("Login failed: No token received");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/jobs");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="auth-container">
            {/* Logo/Brand */}
            <div className="text-center mb-5">
              <h1 className="h2 fw-bold text-primary mb-2">HireLog</h1>
              <p className="text-muted">Track your job applications journey</p>
            </div>

            <h2 className="auth-title">Welcome Back</h2>

            <form onSubmit={handleLogin} className="mt-4">
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-envelope me-2"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="form-control py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-lock me-2"></i>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted mb-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-primary text-decoration-none"
                >
                  Create one now
                </Link>
              </p>
              <p className="text-muted small mt-3">
                By signing in, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
