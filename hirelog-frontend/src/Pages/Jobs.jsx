import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { getJobs } from "../API/jobApi";
import JobCard from "../Components/JobsCard";
import NoJobs from "../Components/NoJobs";

const Jobs = () => {
  const navigate = useNavigate(); // ADD THIS HOOK

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [status, setStatus] = useState("");


  const fetchJobs = async () => {
    setLoading(true);
    const res = await getJobs(page, 5, sortBy, sortDir, status || undefined);
    setJobs(res.data.content);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchJobs();
  }, [page, sortBy, sortDir, status]);

 



  const handleDelete = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handleStatusUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev
        .map((job) => (job.id === updatedJob.id ? updatedJob : job))
        .filter((job) => !status || job.status === status),
    );
  };

  return (
    <div>
      {loading && <p>Loading jobs...</p>}

      {!loading && jobs.length === 0 && <NoJobs />}

      {!loading &&
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        ))}

      {/* Sorting */}
      <div className="flex gap-4 mt-4">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Date</option>
          <option value="companyName">Company</option>
          <option value="jobTitle">Role</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            const newstatus = e.target.value;
            setPage(0);
            setStatus(newstatus);
          }}
        >
          <option value="">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
