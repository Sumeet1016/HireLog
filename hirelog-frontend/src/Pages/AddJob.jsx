import { useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createJob(form);
      navigate("/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3>Add Job</h3>

      {["companyName", "jobTitle", "location", "notes"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">
            {field === "jobTitle" ? "Role" : field}
          </label>
          <input
            name={field}
            className="form-control"
            value={form[field]}
            onChange={handleChange}
            required={field !== "notes"}
          />
        </div>
      ))}

      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default AddJob;
