import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeComplaint } from "../ai/aiEngine";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./CreateComplaint.css";

import { FaHome, FaPlusCircle, FaUser, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

function CreateComplaint() {

  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [location,setLocation] = useState("");
  const [mapImage,setMapImage] = useState("");

  const [image,setImage] = useState(null);
  const [preview,setPreview] = useState(null);

  const [loading,setLoading] = useState(false);
  const [aiResult,setAiResult] = useState(null);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setDescription(transcript);
  }, [transcript]);

// 🤖 AI
const handleAI = async () => {
  const res = await fetch("http://localhost:5000/ai/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: description })
  });

  const data = await res.json();
  setAiResult(data);
};

// 📍 Location
const getLocation = () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    setLocation(`${lat}, ${lng}`);
    setMapImage(`https://maps.locationiq.com/v3/staticmap?key=YOUR_KEY&center=${lat},${lng}&zoom=16&size=600x300`);
  });
};

// 🖼 Image
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};

// 🚀 Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const newComplaint = {
    title,
    description,
    location
  };

  await fetch("http://localhost:5000/complaints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComplaint)
  });

  alert("Submitted ✅");
};

  return (

    <div className="dashboard-layout">

      {/* 🔥 SIDEBAR */}
      <div className="sidebar">
        <h2>⚡ Panel</h2>

        <a href="/dashboard"><FaHome /> Dashboard</a>
        <a href="/create"><FaPlusCircle /> Create</a>
        <a href="/admin"><FaUserShield /> Admin</a>
        <a href="/profile"><FaUser /> Profile</a>
      </div>


      {/* 🔥 MAIN CONTENT WITH ANIMATION */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className="form-card">
          <h2>Create Complaint</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            {/* 🎤 Voice */}
            <div className="btn-row">
              <motion.button type="button" whileTap={{ scale: 0.9 }}
                onClick={()=>SpeechRecognition.startListening({continuous:true})}>
                🎤 Start
              </motion.button>

              <motion.button type="button" whileTap={{ scale: 0.9 }}
                onClick={SpeechRecognition.stopListening}>
                🛑 Stop
              </motion.button>

              <motion.button type="button" whileTap={{ scale: 0.9 }}
                onClick={resetTranscript}>
                🔄 Reset
              </motion.button>
            </div>

            {/* 📍 Location */}
            <input
              type="text"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              placeholder="Location"
            />

            <motion.button type="button" whileTap={{ scale: 0.95 }}
              onClick={getLocation}>
              📍 Detect Location
            </motion.button>

            {mapImage && <img src={mapImage} alt="map" />}

            {/* 🖼 Image */}
            <input type="file" onChange={handleImageChange}/>
            {preview && <img src={preview} alt="preview"/>}

            {/* 🤖 AI Result */}
            {aiResult && (
              <div className="ai-result">
                <p>Category: {aiResult.category}</p>
                <p>Severity: {aiResult.severity}</p>
                <p>Confidence: {(aiResult.probability*100).toFixed(1)}%</p>
              </div>
            )}

            <motion.button type="button"
              whileTap={{ scale: 0.95 }}
              onClick={handleAI}>
              🤖 Check with AI
            </motion.button>

            {/* 🚀 Submit */}
            <motion.button
              type="submit"
              className="submit-btn"
              whileTap={{ scale: 0.9 }}
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>

          </form>
        </div>

      </motion.div>
    </div>
  );
}

export default CreateComplaint;