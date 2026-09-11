import React, { useState ,useEffect} from "react";
import Buttons from "../components/Button";
import { useNavigate,useParams, useLocation} from "react-router-dom";

const Addrecords = () => {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const existingRecord = location.state?.record;
  const isEditMode = Boolean(id);

  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [files, setFiles] = useState([]); //new uploaded files
  const [existingFiles,setExistingFiles] = useState([]); //older files already present
  const [bodyOrgan, setBodyOrgan] = useState("");
  const [medicine, setMedicine] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  //if edit mode we will prefill the fields
  useEffect(() =>{
    if(isEditMode && existingRecord){
      setDate(existingRecord.date ? existingRecord.date.split("T")[0] : "");
      setDoctor(existingRecord.doctor || "");
      setHospital(existingRecord.hospital || "");
      setBodyOrgan(existingRecord.bodyOrgan || "");
      setMedicine(
        Array.isArray(existingRecord.medicine)
          ? existingRecord.medicine.join(",")
          : existingRecord.medicine || ""
      );
      setTitle(existingRecord.title || "");
      setNotes(existingRecord.notes || "");
      setExistingFiles(existingRecord.files || []);
    }
  },[isEditMode, existingRecord]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !title) {
      alert("Please enter date and title");
      return;
    }
    const formData = new FormData();
    formData.append("date", date);
    formData.append("doctor", doctor);
    formData.append("hospital", hospital);
    formData.append("bodyOrgan", bodyOrgan);
    formData.append("medicine", medicine);
    formData.append("title", title);
    formData.append("notes", notes);

    if(isEditMode){
        formData.append("files", JSON.stringify(existingFiles));
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const url = isEditMode? `${BASE_URL}/edit-details/${id}`:`${BASE_URL}/add-details`;
      const res = await fetch(url, {
        method:isEditMode ? "PUT" : "POST",
        credentials:"include",
        body: formData,
      });

      const data = await res.json();
      if(res.ok){
        alert(isEditMode?"Record Updated" : "Record Added");
        navigate("/viewRecord");
      }
      else{
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const fileChangeHandler = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#082332ff",
      }}
    >
      <h2 className="text-center mb-3" style={{ color: "white" }}>
        {isEditMode ? "Edit Medical Record" : "Add Medical Record"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Date */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Enter Date:
          </label>
          <div className="col-sm-8">
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Title */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Record Title:
          </label>
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
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Doctor Name:
          </label>
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
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Hospital Name:
          </label>
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
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Body Organ:
          </label>
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
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Medicines:
          </label>
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
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            Notes:
          </label>
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

        {/* Existing Files (edit mode only) */}
        {isEditMode && existingFiles.length > 0 && (
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
              Existing Files:
            </label>
            <div className="col-sm-8">
              <ul className="list-group">
                {existingFiles.map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                      {file.filename}
                    </a>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeExistingFile(index)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


        {/* Files */}
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label" style={{ color: "white" }}>
            {isEditMode ? "Add More Files:" : "Add Files:"}
          </label>
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

        <Buttons type ="submit" bcolor="white" Bcontent={isEditMode ? "Update" : "Submit" }/>
      </form>
    </div>
  );
};

export default Addrecords;
