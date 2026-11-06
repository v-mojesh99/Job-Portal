import { useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { INITIAL_USERS, INITIAL_JOBS, INITIAL_APPLICATIONS, KEYS } from "./data";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import UserModule from "./components/UserModule";
import AdminModule from "./components/AdminModule";

export default function App() {
  const [users, setUsers] = useLocalStorage(KEYS.USERS, INITIAL_USERS);
  const [currentUser, setCurrentUser] = useLocalStorage(KEYS.ACTIVE_USER, null);
  const [jobs, setJobs] = useLocalStorage(KEYS.JOBS, INITIAL_JOBS);
  const [applications, setApplications] = useLocalStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const [toast, setToast] = useState("");
  const [view, setView] = useState("main"); // main | secondary (sub-view per role)

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  const login = (email, password, role) => {
    const matched = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role
    );
    if (!matched) return "Incorrect email, password, or role. Please try again.";
    setCurrentUser(matched);
    setView("main");
    showToast(`Logged in successfully as ${matched.name}!`);
    return null;
  };

  const signup = (name, email, password, role) => {
    email = email.trim().toLowerCase();
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (users.some((u) => u.email.toLowerCase() === email))
      return "An account with this email already exists.";
    const newUser = { id: "u-" + Date.now(), name: name.trim(), email, password, role };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setView("main");
    showToast(`Account created! Welcome, ${newUser.name}.`);
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("Logged out successfully.");
  };

  const toastEl = toast && <div className="toast-msg">{toast}</div>;

  if (!currentUser) {
    return (
      <>
        <Auth onLogin={login} onSignup={signup} />
        {toastEl}
      </>
    );
  }

  const isAdmin = currentUser.role === "admin";
  const myAppCount = applications.filter(
    (a) => a.applicantEmail.toLowerCase() === currentUser.email.toLowerCase()
  ).length;

  return (
    <>
      <Navbar
        user={currentUser}
        view={view}
        setView={setView}
        onLogout={logout}
        badge={isAdmin ? applications.length : myAppCount}
      />
      <main className="page-container">
        {isAdmin ? (
          <AdminModule
            view={view}
            jobs={jobs}
            setJobs={setJobs}
            applications={applications}
            setApplications={setApplications}
            showToast={showToast}
          />
        ) : (
          <UserModule
            view={view}
            setView={setView}
            user={currentUser}
            jobs={jobs}
            applications={applications}
            setApplications={setApplications}
            showToast={showToast}
          />
        )}
      </main>
      {toastEl}
    </>
  );
}
