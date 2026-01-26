import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const[loading,setLoading]=useState(false);

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();

    const newJob = {
      companyName,
      jobTitle,
      location,
      appliedDate,
      notes,
      status:"Applied",
      userId:1,
    };


    try{
      setLoading(true);
      await api.post("/api/users/1/jobs", newJob);
      navigate("/");
    }catch{
      alert("Failed to add job");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <input
          type="text"
          className="form-control"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
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
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
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

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading?"Saving..":"Submit"}
      </button>
    </form>
  );
};

export default AddJob;
