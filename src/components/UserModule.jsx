import { useState } from "react";

function ApplyModal({ job, user, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: "",
    experience: "",
    resume: "",
    note: "",
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-top">
          <div>
            <h3>Apply for Job</h3>
            <p className="subtitle">{job.title} at {job.company}</p>
          </div>
          <button className="close-x-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Your Full Name *</label>
            <input type="text" required value={form.name} onChange={set("name")} placeholder="John Doe" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" required value={form.email} onChange={set("email")} placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+1 555-1234" />
            </div>
          </div>
          <div className="form-group">
            <label>Experience Level *</label>
            <select required value={form.experience} onChange={set("experience")}>
              <option value="">Select Experience</option>
              <option>Fresher / Entry-Level</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
          <div className="form-group">
            <label>Resume File Name or Upload *</label>
            <input type="text" required value={form.resume} onChange={set("resume")} placeholder="e.g. Resume_JohnDoe.pdf" />
          </div>
          <div className="form-group">
            <label>Short Message / Cover Note</label>
            <textarea rows="2" value={form.note} onChange={set("note")} placeholder="Why are you a good fit?" />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserModule({ view, setView, user, jobs, applications, setApplications, showToast }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [dept, setDept] = useState("all");
  const [applyJob, setApplyJob] = useState(null);

  const s = search.toLowerCase().trim();
  const filtered = jobs.filter((j) => {
    const matchSearch =
      !s ||
      j.title.toLowerCase().includes(s) ||
      j.company.toLowerCase().includes(s) ||
      j.description.toLowerCase().includes(s);
    return matchSearch && (type === "all" || j.type === type) && (dept === "all" || j.dept === dept);
  });

  const myApps = applications.filter(
    (a) => a.applicantEmail.toLowerCase() === user.email.toLowerCase()
  );

  const submitApplication = (f) => {
    const newApp = {
      id: "app-" + Date.now(),
      jobId: applyJob.id,
      jobTitle: applyJob.title,
      company: applyJob.company,
      applicantName: f.name.trim(),
      applicantEmail: f.email.trim(),
      applicantPhone: f.phone.trim(),
      experience: f.experience,
      resumeName: f.resume.trim(),
      status: "Pending",
    };
    setApplications([newApp, ...applications]);
    setApplyJob(null);
    showToast("Application submitted! The Admin has received your application.");
    setView("secondary");
  };

  if (view === "secondary") {
    return (
      <section>
        <div className="view-header">
          <div>
            <h2>My Submitted Applications</h2>
            <p>Check the status of jobs you applied for.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setView("main")}>&larr; Back to Jobs</button>
        </div>

        {myApps.length === 0 ? (
          <div className="empty-box">
            <p>You have not applied for any jobs yet.</p>
            <button className="btn btn-primary" onClick={() => setView("main")}>Browse Jobs</button>
          </div>
        ) : (
          <div className="applications-container">
            {myApps.map((a) => (
              <div className="app-item-card" key={a.id}>
                <div>
                  <h3>{a.jobTitle}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.88rem" }}>
                    {a.company} &bull; Resume: {a.resumeName}
                  </p>
                </div>
                <span className={`status-pill status-${a.status.toLowerCase()}`}>{a.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section>
      <div className="hero">
        <h1>Available Job Openings</h1>
        <p>Search for roles and apply online directly.</p>
      </div>

      <div className="search-bar-card">
        <input type="text" placeholder="🔍 Search job title, company, or keyword..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="filter-controls">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Remote">Remote</option>
            <option value="Part-Time">Part-Time</option>
          </select>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
          </select>
          <button className="btn btn-secondary" onClick={() => { setSearch(""); setType("all"); setDept("all"); }}>
            Reset
          </button>
        </div>
      </div>

      <div className="job-grid">
        {filtered.length === 0 ? (
          <div className="empty-box"><p>No jobs found matching your filters.</p></div>
        ) : (
          filtered.map((job) => (
            <div className="job-card" key={job.id}>
              <div>
                <div className="job-header">
                  <div>
                    <span className="company-name">{job.company}</span>
                    <h3 className="job-title">{job.title}</h3>
                  </div>
                  <span className="badge">{job.type}</span>
                </div>
                <p className="job-body-desc">{job.description}</p>
                <div className="job-tags">
                  <span>📍 {job.location}</span>
                  <span>🏷️ {job.dept}</span>
                </div>
              </div>
              <div className="job-footer">
                <span className="job-salary-text">{job.salary}</span>
                <button className="btn btn-primary btn-sm" onClick={() => setApplyJob(job)}>Apply Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      {applyJob && (
        <ApplyModal job={applyJob} user={user} onClose={() => setApplyJob(null)} onSubmit={submitApplication} />
      )}
    </section>
  );
}
