import { useState } from "react";
import { registerUser } from "../API/authApi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
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
              <p className="text-muted">Start tracking your job applications</p>
            </div>

            <h2 className="auth-title">Create Account</h2>
            <p className="text-center text-muted mb-4">
              Fill in your details to get started
            </p>

            <form onSubmit={handleSubmit} className="mt-4">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  icon: "bi-person",
                  type: "text",
                },
                {
                  name: "email",
                  label: "Email Address",
                  icon: "bi-envelope",
                  type: "email",
                },
                {
                  name: "password",
                  label: "Password",
                  icon: "bi-lock",
                  type: "password",
                },
              ].map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="form-label fw-semibold">
                    <i className={`bi ${field.icon} me-2`}></i>
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="form-control py-2"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  required
                />
                <label
                  className="form-check-label small text-muted"
                  htmlFor="termsCheck"
                >
                  I agree to the{" "}
                  <Link to="#" className="text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-primary">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="fw-semibold text-primary text-decoration-none"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
