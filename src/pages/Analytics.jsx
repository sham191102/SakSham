import { useState,useEffect } from "react";

function AdminDashboard(){

 const [complaints,setComplaints] = useState([]);

 useEffect(()=>{

  const data =
  JSON.parse(localStorage.getItem("complaints")) || [];

  setComplaints(data);

 },[]);

 const resolveComplaint=(id)=>{

  const updated = complaints.map(c=>{
   if(c.id===id){
    return {...c,status:"Resolved"};
   }
   return c;
  });

  setComplaints(updated);

  localStorage.setItem(
   "complaints",
   JSON.stringify(updated)
  );

 };

 return(

 <div>

 <h1>Admin Dashboard</h1>

 {complaints.map(c=>(
  <div key={c.id}>

   <h3>{c.title}</h3>

   <p>Category: {c.category}</p>

   <p>Severity: {c.severity}</p>

   <p>Status: {c.status}</p>

   <button
    onClick={()=>resolveComplaint(c.id)}
   >
   Mark Resolved
   </button>

  </div>
 ))}

 </div>

 );

}

export default AdminDashboard;