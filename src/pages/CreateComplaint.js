import { useState } from "react"
import "./CreateComplaint.css"

function CreateComplaint() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [location, setLocation] = useState("")
  const [mapImage, setMapImage] = useState("")
  
  const [image, setImage] = useState(null) 
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 📍 Auto Location
  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLocation(
  //       `${position.coords.latitude}, ${position.coords.longitude}`
      const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {

    const lat = position.coords.latitude
    const lng = position.coords.longitude

    const loc = `${lat}, ${lng}`
    setLocation(loc)

    // Map image generate
    const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=YOUR_API_KEY&center=${lat},${lng}&zoom=16&size=600x300&markers=icon:large-red-cutout|${lat},${lng}`

    setMapImage(mapUrl)
    //  )
    })
  }

  // 🖼 Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  // 🎤 Voice Support
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.onresult = (event) => {
      setDescription(event.results[0][0].transcript)
    }
    recognition.start()
  }

  // 🚀 Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const trackingId = "CMP" + Math.floor(Math.random() * 100000)

    const newComplaint = {
      id: Date.now(),
      trackingId,
      title,
      description,
      category,
      priority,
      location,
      mapImage,
      image ,
      status: "Pending",
      date: new Date().toLocaleString()
    }

    console.log(newComplaint)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTitle("")
      setDescription("")
      setCategory("")
      setPriority("Medium")
      setLocation("")
      setImage(null)
      setPreview(null)
    }, 1500)

  const stored =
  JSON.parse(localStorage.getItem("complaints")) || [];

stored.push(newComplaint);

localStorage.setItem("complaints", JSON.stringify(stored));

  }

  return (
    <div className="complaint-container">
      <h2>Create New Complaint</h2>

      {success && <p className="success-msg">Complaint Submitted Successfully!</p>}

      <form onSubmit={handleSubmit} className="complaint-form">

        {/* Title */}
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /> 

        {/* Description + Voice */}
        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="200"
          required
        />
        <div className="description-footer">
          <span>{description.length}/200</span>
          <button type="button" onClick={startListening}>
            🎤 Speak
          </button>
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Road Issue">Road Issue</option>
          <option value="Water Problem">Water Problem</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Noise Pollution">Noise Pollution</option>
          <option value="Other Issue">Other Issue</option>
        </select>

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {/* Location */}
        <div className="location-box">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="button" onClick={getLocation}>
            Detect
          </button>
        </div>

        {mapImage && (
         <div className="map-preview">
           <img src={mapImage} alt="map location" />
         </div>
       )}

        {/* Image Upload */}
        <input type="file" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        {/* Submit */}
        <button type="submit" className="submit-btn">
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </form>
    </div>
  )
}

export default CreateComplaint