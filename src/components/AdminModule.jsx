import { useState } from "react";

const EMPTY_JOB = {
  title: "", company: "", dept: "Engineering", type: "Full-Time",
  location: "", salary: "", description: "",
};

function PostJobModal({ onClose, onSubmit }) {
  const [f, setF] = useState(EMPTY_JOB);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-top">
          <h3>Post a New Job Opening</h3>
          <button className="close-x-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(f); }}>
          <div className="form-group">
            <label>Job Title *</label>
            <input type="text" required value={f.title} onChange={set("title")} placeholder="e.g. Frontend Developer" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input type="text" required value={f.company} onChange={set("company")} placeholder="e.g. Google / Microsoft" />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <select value={f.dept} onChange={set("dept")}>
                <option>Engineering</option><option>Design</option><option>Product</option><option>Marketing</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Job Type *</label>
              <select value={f.type} onChange={set("type")}>
                <option>Full-Time</option><option>Remote</option><option>Part-Time</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input type="text" required value={f.location} onChange={set("location")} placeholder="e.g. New York, NY or Remote" />
            </div>
          </div>
          <div className="form-group">
            <label>Salary *</label>
            <input type="text" required value={f.salary} onChange={set("salary")} placeholder="e.g. $80,000 - $110,000 / year" />
          </div>
          <div className="form-group">
            <label>Job Description *</label>
            <textarea rows="3" required value={f.description} onChange={set("description")} placeholder="Describe the job duties..." />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminModule({ view, jobs, setJobs, applications, setApplications, showToast }) {
  const [showPost, setShowPost] = useState(false);

  const updateStatus = (id, status) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast(`Candidate status updated to "${status}"!`);
  };

  const postJob = (f) => {
    const job = {
      id: "job-" + Date.now(),
      title: f.title.trim(), company: f.company.trim(), dept: f.dept, type: f.type,
      location: f.location.trim(), salary: f.salary.trim(), description: f.description.trim(),
    };
    setJobs([job, ...jobs]);
    setShowPost(false);
    showToast(`New job "${job.title}" posted!`);
  };

  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job opening?")) {
      setJobs(jobs.filter((j) => j.id !== id));
      showToast("Job opening removed.");
    }
  };

  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;

  return (
    <section>
      <div className="admin-top-banner">
        <div>
          <span className="admin-tag">Admin Portal</span>
          <h1>Recruiter Dashboard</h1>
          <p>View all candidate applications and manage job posts.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowPost(true)}>+ Post New Job</button>
      </div>

      <div className="admin-stats-grid">
        <div className="stat-box"><span className="stat-title">Total Job Openings</span><span className="stat-number">{jobs.length}</span></div>
        <div className="stat-box"><span className="stat-title">Applications Received</span><span className="stat-number">{applications.length}</span></div>
        <div className="stat-box"><span className="stat-title">Shortlisted Candidates</span><span className="stat-number">{shortlisted}</span></div>
      </div>

      {view === "main" ? (
        <div>
          <div className="view-header">
            <h3>All Candidate Applications Received</h3>
            <span className="note-text">When any user applies for a job, their submission shows up here!</span>
          </div>
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Applicant Name</th><th>Job Title</th><th>Email & Phone</th>
                  <th>Experience</th><th>Resume</th><th>Current Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td><strong>{app.applicantName}</strong></td>
                    <td>{app.jobTitle}<br /><small style={{ color: "#64748b" }}>{app.company}</small></td>
                    <td>{app.applicantEmail}<br /><small style={{ color: "#64748b" }}>{app.applicantPhone}</small></td>
                    <td>{app.experience}</td>
                    <td>📄 {app.resumeName}</td>
                    <td><span className={`status-pill status-${app.status.toLowerCase()}`}>{app.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button className="btn btn-sm btn-primary" onClick={() => updateStatus(app.id, "Shortlisted")}>Shortlist</button>
                        <button className="btn btn-sm btn-danger" onClick={() => updateStatus(app.id, "Rejected")}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {applications.length === 0 && (
              <div className="empty-box"><p>No applications received yet. When users apply, they will appear here!</p></div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="view-header"><h3>Active Job Listings</h3></div>
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr><th>Job Title</th><th>Company</th><th>Department</th><th>Type</th><th>Salary</th><th>Action</th></tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td><strong>{job.title}</strong></td>
                    <td>{job.company}</td>
                    <td>{job.dept}</td>
                    <td><span className="badge">{job.type}</span></td>
                    <td>{job.salary}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteJob(job.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showPost && <PostJobModal onClose={() => setShowPost(false)} onSubmit={postJob} />}
    </section>
  );
}
