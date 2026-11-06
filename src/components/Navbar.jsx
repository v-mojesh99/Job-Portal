export default function Navbar({ user, view, setView, onLogout, badge }) {
  const isAdmin = user.role === "admin";
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand">
          <span className="logo-emoji">💼</span>
          <span className="brand-text">JobPortal</span>
        </div>

        <nav className="nav-links">
          {isAdmin ? (
            <>
              <button className={`nav-link-btn ${view === "main" ? "active" : ""}`} onClick={() => setView("main")}>
                All Applications ({badge})
              </button>
              <button className={`nav-link-btn ${view === "secondary" ? "active" : ""}`} onClick={() => setView("secondary")}>
                Manage Jobs
              </button>
            </>
          ) : (
            <>
              <button className={`nav-link-btn ${view === "main" ? "active" : ""}`} onClick={() => setView("main")}>
                Browse Jobs
              </button>
              <button className={`nav-link-btn ${view === "secondary" ? "active" : ""}`} onClick={() => setView("secondary")}>
                My Applications ({badge})
              </button>
            </>
          )}
        </nav>

        <div className="nav-user-info">
          <span className="logged-user-name">
            👤 {user.name} ({isAdmin ? "Admin" : "Job Seeker"})
          </span>
          <button className="btn btn-sm btn-danger" onClick={onLogout}>Log Out</button>
        </div>
      </div>
    </header>
  );
}
