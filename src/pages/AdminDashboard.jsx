import { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(data);
  }, []);

  const resolveComplaint = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "Resolved" } : c
    );

    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  return (
    <div className="dashboard">
      <h1>🚨 Admin Dashboard</h1>

      {complaints.length === 0 && (
        <p className="empty">No complaints found</p>
      )}

      {complaints.map((c) => (
        <div key={c.id} className="card">
          <h3>{c.title}</h3>

          <p>
            <b>Category:</b>{" "}
            <span className="tag">{c.category || "Not detected"}</span>
          </p>

          <p>
            <b>Severity:</b>{" "}
            <span className={`severity ${c.severity}`}>
              {c.severity || "Not detected"}
            </span>
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status ${c.status}`}>
              {c.status}
            </span>
          </p>

          {c.status !== "Resolved" && (
            <button onClick={() => resolveComplaint(c.id)}>
              Mark Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;