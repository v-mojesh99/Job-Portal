import { useState } from "react";

export default function Auth({ onLogin, onSignup }) {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("user");

  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupRole, setSignupRole] = useState("user");
  const [signupPassword, setSignupPassword] = useState("");

  const switchMode = (m) => {
    setMode(m);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const err = onLogin(loginEmail.trim(), loginPassword, loginRole);
    if (err) setError(err);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const err = onSignup(name, signupEmail, signupPassword, signupRole);
    if (err) setError(err);
  };

  const demo = (email, password, role) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginRole(role);
    const err = onLogin(email, password, role);
    if (err) setError(err);
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">💼</span>
          <h2>Job Portal {mode === "login" ? "Login" : "Sign Up"}</h2>
          <p>{mode === "login" ? "Please log in to continue" : "Create your account"}</p>
        </div>

        <div className="demo-box">
          <p><strong>1-Click Quick Demo Login:</strong></p>
          <div className="demo-btn-group">
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => demo("user@jobportal.com", "user123", "user")}>
              👤 Login as User
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => demo("admin@jobportal.com", "admin123", "admin")}>
              🛠️ Login as Admin
            </button>
          </div>
        </div>

        <div className="role-tabs">
          <button className={`role-tab ${mode === "login" ? "active" : ""}`} onClick={() => switchMode("login")}>Log In</button>
          <button className={`role-tab ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")}>Create New Account</button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="e.g. user@jobportal.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Log In As</label>
              <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}>
                <option value="user">Job Seeker (User)</option>
                <option value="admin">Recruiter (Admin)</option>
              </select>
            </div>
            {error && <div className="error-text">{error}</div>}
            <button type="submit" className="btn btn-primary btn-block">Log In to Portal</button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Account Role</label>
              <select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
                <option value="user">Job Seeker (User)</option>
                <option value="admin">Recruiter (Admin)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password (Min 6 characters)</label>
              <input type="password" placeholder="At least 6 characters" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            </div>
            {error && <div className="error-text">{error}</div>}
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
