// import { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { analyzeComplaint } from "../ai/aiEngine";
// import "./CreateComplaint.css"

// function CreateComplaint() {

//     const navigate = useNavigate();
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [category, setCategory] = useState("")
//   const [priority, setPriority] = useState("Medium")
//   const [location, setLocation] = useState("")
//   const [mapImage, setMapImage] = useState("")
  
//   const [image, setImage] = useState(null) 
//   const [preview, setPreview] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//       const getLocation = () => {
//   navigator.geolocation.getCurrentPosition((position) => {

//     const lat = position.coords.latitude
//     const lng = position.coords.longitude

//     const loc = `${lat}, ${lng}`
//     setLocation(loc)

//     // Map image generate
//     const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=YOUR_API_KEY&center=${lat},${lng}&zoom=16&size=600x300&markers=icon:large-red-cutout|${lat},${lng}`

//     setMapImage(mapUrl)
//     //  )
//     })
//   }

//   // 🖼 Image Preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     setImage(file)
//     if (file) {
//       setPreview(URL.createObjectURL(file))
//     }
//   }

//   // 🎤 Voice Support
//   const startListening = () => {
//     const recognition = new window.webkitSpeechRecognition()
//     recognition.onresult = (event) => {
//       setDescription(event.results[0][0].transcript)
//     }
//     recognition.start()
//   }

//   // 🚀 Submit
//   const handleSubmit = async (e) => {

//  e.preventDefault();

  
//  const text = title + " " + location;

//  const ai = analyzeComplaint(text);

//  if(ai.probability < 0.2){
//   alert("AI rejected complaint ❌");
//   return;
//  }

//  const user = JSON.parse(localStorage.getItem("user"));

//  const newComplaint = {
//   title,
//   description,
//   location,
//   category: ai.category,
//   severity: ai.severity,
//   status:"Pending",
//   userEmail:user.email
//  };

//  try{

//   const res = await fetch("http://localhost:5000/complaints",{
//    method:"POST",
//    headers:{
//     "Content-Type":"application/json"
//    },
//    body:JSON.stringify(newComplaint)
   
//   });

//   const data = await res.json();

//   alert("Complaint submitted successfully");

//   navigate("/dashboard");

//  }catch(error){
//   console.log(error);
//   alert("Server error");
//  }

// };

//   return (
//     <div className="complaint-container">
//       <h2>Create New Complaint</h2>

//       {success && <p className="success-msg">Complaint Submitted Successfully!</p>}

//       <form onSubmit={handleSubmit} className="complaint-form">

//         {/* Title */}
//         <input
//           type="text"
//           placeholder="Complaint Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         /> 

//         {/* Description + Voice */}
//         <textarea
//           placeholder="Describe your issue..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           maxLength="200"
//           required
//         />
//         <div className="description-footer">
//           <span>{description.length}/200</span>
//           <button type="button" onClick={startListening}>
//             🎤 Speak
//           </button>
//         </div>

//         {/* Category */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Road Issue">Road Issue</option>
//           <option value="Water Problem">Water Problem</option>
//           <option value="Electricity">Electricity</option>
//           <option value="Garbage">Garbage</option>
//           <option value="Noise Pollution">Noise Pollution</option>
//           <option value="Other Issue">Other Issue</option>
//         </select>

//         {/* Priority */}
//         <select
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//         >
//           <option value="Low">Low Priority</option>
//           <option value="Medium">Medium Priority</option>
//           <option value="High">High Priority</option>
//         </select>

//         {/* Location */}
//         <div className="location-box">
//           <input
//             type="text"
//             placeholder="Location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <button type="button" onClick={getLocation}>
//             Detect
//           </button>
//         </div>

//         {mapImage && (
//          <div className="map-preview">
//            <img src={mapImage} alt="map location" />
//          </div>
//        )}

//         {/* Image Upload */}
//         <input type="file" onChange={handleImageChange} />
//         {preview && (
//           <img src={preview} alt="preview" className="preview-img" />
//         )}

//         {/* Submit */}
//         <button type="submit" className="submit-btn">
//           {loading ? "Submitting..." : "Submit Complaint"}
//         </button>
   
  

//       </form>
//     </div>
//   )
// }

// export default CreateComplaint

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeComplaint } from "../ai/aiEngine";
import "./CreateComplaint.css";

function CreateComplaint() {

  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [location,setLocation] = useState("");
  const [mapImage,setMapImage] = useState("");

  const [image,setImage] = useState(null);
  const [preview,setPreview] = useState(null);

  const [loading,setLoading] = useState(false);

  // 📍 Detect Location
  const getLocation = () => {

    navigator.geolocation.getCurrentPosition((position)=>{

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const loc = `${lat}, ${lng}`;
      setLocation(loc);

      const mapUrl =
      `https://maps.locationiq.com/v3/staticmap?key=YOUR_API_KEY&center=${lat},${lng}&zoom=16&size=600x300&markers=icon:large-red-cutout|${lat},${lng}`;

      setMapImage(mapUrl);

    });

  };

  // 🖼 Image Preview
  const handleImageChange = (e)=>{

    const file = e.target.files[0];
    setImage(file);

    if(file){
      setPreview(URL.createObjectURL(file));
    }

  };

  // 🎤 Voice Recognition
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      const speechText = event.results[0][0].transcript;

      setDescription((prev)=> prev + " " + speechText);

    };

    recognition.start();

  };

  // 🚀 Submit Complaint
  const handleSubmit = async (e)=>{

    e.preventDefault();

    setLoading(true);

    const text = title + " " + description;

    const ai = analyzeComplaint(text);

    if(ai.probability < 0.2){

      alert("AI rejected complaint ❌");
      setLoading(false);
      return;

    }

    const user = JSON.parse(localStorage.getItem("user"));

    const newComplaint = {

      title,
      description,
      location,
      image,

      category: ai.category,
      severity: ai.severity,

      status:"Pending",
      userEmail:user.email

    };

    try{

      const res = await fetch("http://localhost:5000/complaints",{

        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(newComplaint)

      });

      await res.json();

      alert("Complaint submitted successfully ✅");

      navigate("/dashboard");

    }

    catch(error){

      console.log(error);
      alert("Server error");

    }

    setLoading(false);

  };

  return (

    <div className="complaint-container">

      <h2>Create Complaint</h2>

      <form onSubmit={handleSubmit} className="complaint-form">

        {/* Title */}

        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />

        {/* Description */}

        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />

        <div className="voice-box">

          <button
          type="button"
          onClick={startListening}
          className="voice-btn"
          >

          🎤 Speak

          </button>

        </div>

        {/* Location */}

        <div className="location-box">

          <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          />

          <button
          type="button"
          onClick={getLocation}
          >

          Detect

          </button>

        </div>

        {mapImage && (

          <div className="map-preview">

            <img src={mapImage} alt="map"/>

          </div>

        )}

        {/* Image Upload */}

        <input
        type="file"
        onChange={handleImageChange}
        />

        {preview && (

          <img
          src={preview}
          alt="preview"
          className="preview-img"
          />

        )}

        {/* Submit */}

        <button
        type="submit"
        className="submit-btn"
        >

        {loading ? "Submitting..." : "Submit Complaint"}

        </button>

      </form>

    </div>

  );

}

export default CreateComplaint;