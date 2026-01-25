const JobsCard=({job})=>{
    return (
      
      <div class="card">
        <div class="card-body">
          <div className="companyRow">
            <h5 class="card-title ">{job.company}</h5>
            <h5 class="card-title ">Interview</h5>
          </div>
          <h6 class="card-subtitle mb-2 text-body-secondary">{job.title}</h6>
          <h6 class="card-subtitle mb-2 text-body-secondary">{job.location}</h6>
          <br />
          <h6 class="card-subtitle mb-2 text-body-secondary">Applied on: {job.appliedon}</h6>
          <div className="notesSection">
            <h6>Notes:</h6>
            <p class="card-text">
             {job.notes}
            </p>
          </div>
          <a href="#" class="card-link">
            Edit
          </a>
          <a href="#" class="card-link">
            Status
          </a>
          <a href="#" class="card-link">
            Delete
          </a>
        </div>
      </div>
    );
}

export default JobsCard; 