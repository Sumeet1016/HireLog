import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJob = ({ addJob }) => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [appliedOn, setAppliedOn] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      company,
      title,
      location,
      appliedOn,
      notes,
    };

    addJob(newJob);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Applied On</label>
        <input
          type="date"
          className="form-control"
          value={appliedOn}
          onChange={(e) => setAppliedOn(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Notes</label>
        <input
          type="text"
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddJob;
