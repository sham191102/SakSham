import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints");
    setComplaints(res.data);
  };

  const verifyComplaint = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/verify/${id}`, {
      status,
    });
    fetchComplaints();
  };

  const assignDepartment = async (id, dept) => {
    await axios.put(`http://localhost:5000/api/admin/assign/${id}`, {
      department: dept,
    });
    fetchComplaints();
  };

return (
  <div className="admin-container">
    <h1>Admin Panel</h1>

    {complaints.map((c) => (
      <div key={c._id} className="complaint-card">
        <h3 className="complaint-title">{c.title}</h3>
        <p className="complaint-text">{c.description}</p>

        <p className={`status ${c.status}`}>
          Status: {c.status}
        </p>

        <p className="department">
          Department: {c.department || "Not Assigned"}
        </p>

        <button
          className="btn verify-btn"
          onClick={() => verifyComplaint(c._id, "Verified")}
        >
          Verify
        </button>

        <button
          className="btn reject-btn"
          onClick={() => verifyComplaint(c._id, "Rejected")}
        >
          Reject
        </button>

        <br />

        <select onChange={(e) => assignDepartment(c._id, e.target.value)}>
          <option>Select Dept</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
          <option value="Sanitation">Sanitation</option>
        </select>
      </div>
    ))}
  </div>
);

  // return (
  //   <div>
  //     <h1>Admin Panel</h1>

  //     {complaints.map((c) => (
  //       <div key={c._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
  //         <h3>{c.title}</h3>
  //         <p>{c.description}</p>
  //         <p>Status: {c.status}</p>
  //         <p>Department: {c.department || "Not Assigned"}</p>

  //         {/* Verify */}
  //         <button onClick={() => verifyComplaint(c._id, "Verified")}>
  //           Verify
  //         </button>

  //         <button onClick={() => verifyComplaint(c._id, "Rejected")}>
  //           Reject
  //         </button>

  //         {/* Assign */}
  //         <select onChange={(e) => assignDepartment(c._id, e.target.value)}>
  //           <option>Select Dept</option>
  //           <option value="Water">Water</option>
  //           <option value="Electricity">Electricity</option>
  //           <option value="Road">Road</option>
  //           <option value="Sanitation">Sanitation</option>
  //         </select>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default Admin;