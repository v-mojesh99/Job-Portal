export const INITIAL_USERS = [
  { id: "u1", name: "Alex Candidate", email: "user@jobportal.com", password: "user123", role: "user" },
  { id: "u2", name: "Sarah Admin (HR)", email: "admin@jobportal.com", password: "admin123", role: "admin" },
];

export const INITIAL_JOBS = [
  { id: "job-101", title: "Frontend Web Developer", company: "Google / TechCorp", dept: "Engineering", type: "Full-Time", location: "New York, NY", salary: "$90,000 - $120,000 / year", description: "Build clean, responsive, and interactive user interfaces using React and modern JavaScript." },
  { id: "job-102", title: "UI/UX Product Designer", company: "Creative Studio", dept: "Design", type: "Remote", location: "Remote", salary: "$85,000 - $110,000 / year", description: "Design clean wireframes and modern visual layouts for mobile and web platforms." },
  { id: "job-103", title: "Associate Product Manager", company: "CloudSolutions", dept: "Product", type: "Full-Time", location: "San Francisco, CA", salary: "$100,000 - $130,000 / year", description: "Lead product development sprints and translate business needs into engineering tasks." },
];

export const INITIAL_APPLICATIONS = [
  { id: "app-101", jobId: "job-101", jobTitle: "Frontend Web Developer", company: "Google / TechCorp", applicantName: "Alex Candidate", applicantEmail: "user@jobportal.com", applicantPhone: "+1 555-0182", experience: "1-3 Years", resumeName: "Alex_Resume.pdf", status: "Shortlisted" },
];

export const KEYS = {
  USERS: "portal_users",
  ACTIVE_USER: "portal_active_user",
  JOBS: "portal_jobs",
  APPLICATIONS: "portal_applications",
};
