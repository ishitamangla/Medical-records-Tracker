import React, { useState } from "react";
import Buttons from "../components/Button";
import { useNavigate } from "react-router-dom";
const Addrecords = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [files, setFiles] = useState([]);
  const [bodyOrgan, setBodyOrgan] = useState("");
  const [medicine, setMedicine] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("date", date);
    formData.append("doctor", doctor);
    formData.append("hospital", hospital);
    formData.append("bodyOrgan", bodyOrgan);
    formData.append("medicine", medicine);
    formData.append("title", title);
    formData.append("notes", notes);

    files.forEach((file) => {
      formData.append("files", file); // directly append the File object
    });

    try {
      const res = await fetch("http://localhost:3000/api/user/add-details", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const fileChangeHandler = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  return (
<<<<<<< HEAD:pages/Addrecords.jsx
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#87b5c4ff",
      }}
    >
      <h2>Add Medical Record</h2>
      <form onSubmit={handleSubmit}>
        {/* Date */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Enter Date:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
=======
    <div style={{maxWidth:'900px', margin:'auto',padding:'20px', backgroundColor:'#87b5c4ff'}}>
        <div className="d-flex justify-content-center align-items-center mb-3">
            <h1>Add Medical Record</h1>
        </div>
        

      
      <form onSubmit={onSubmitHandler}>
        
        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Enter Date:</label>
            <div className='col-sm-8 '>
                <input className="form-control"type="date" onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
>>>>>>> 8707f9e (Move frontend files into frontend folder):frontend/pages/Addrecords.jsx
        </div>

        {/* Title */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Record Title:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter record title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Doctor */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Doctor Name:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter Doctor Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
        </div>

        {/* Hospital */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Hospital Name:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter Hospital Name"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </div>
        </div>

        {/* Body Organ */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Body Organ:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter Body Organ"
              value={bodyOrgan}
              onChange={(e) => setBodyOrgan(e.target.value)}
            />
          </div>
        </div>

        {/* Medicine */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Medicines:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter medicines"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Notes:</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="text"
              placeholder="Enter any other information"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Files */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Add Files:</label>
          <div className="col-sm-8">
            <input
              multiple
              accept="image/*,application/pdf"
              className="form-control"
              type="file"
              onChange={fileChangeHandler}
            />
            {files.length > 0 && (
              <ul className="list-group mt-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {file.name}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFile(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Buttons Bcontent="Submit" />
      </form>
    </div>
  );
};

export default Addrecords;
