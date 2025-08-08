import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Buttons from '../components/Button';
import Alert from 'react-bootstrap/Alert';
const Addrecords = () => {

    const [date,setDate] = useState('');
    const[doctor,setDoctor] = useState("");
    const[hospital,setHospital] = useState("");
    const [files,setFiles] = useState([]);
    const [bodyOrgan,setBodyOrgan] = useState("");
    const [medicine,setMedicine] = useState("");
    const[title,setTitle] = useState("");
    const[notes,setNotes] = useState("");

    const onSubmitHandler= async (e)=>{
        e.preventDefault();
        if(!date || !title.trim()){
            alert("Please enter date and title ")
            return;
        }
        const formData = new FormData()
            formData.append('date',date);
            formData.append('title',title);
            formData.append('doctor',doctor);
            formData.append('hospital',hospital);
            formData.append('medicine',medicine);
            formData.append('notes',notes);
            formData.append('bodyOrgan',bodyOrgan);
           
            files.forEach(({file}) =>{
                formData.append('files',file);
            });

            for(const [key,value] of formData.entries()){
                console.log(key,value)
            }

            // try{
            //     const response = await fetch('http://localhost:3000/',{
            //         method:'POST',
            //         body:formData
            //     })
            //     if(!response.ok){
            //         throw new Error('Failed to Submit record');
            //     }
            //     const result = await response.json();
            //     console.log('success',result);
            //     alert('record submitted successfully');
            //     setDate('');
            //     setTitle('');
            //     setDoctor('');
            //     setHospital('');
            //     setMedicine('');
            //     setNotes('');
            //     setBodyOrgan('');
            //     setFiles([]);
            // }
            // catch(error){
            //     console.log(error.message)
            //     alert(`error:${error.message}`)
            // }


    }
    const removeFile =(id)=>{
        setFiles(prev=>prev.filter(f=>f.id !== id))
    }
    const fileChangeHandler=(e)=>{
        const selectedFiles = Array.from(e.target.files).map(file=>({file,id:file.name+"_"+file.lastModified}))
        setFiles(prev =>[...prev,...selectedFiles])
    }
  return (
    <div style={{maxWidth:'900px', margin:'auto',padding:'20px', backgroundColor:'#87b5c4ff'}}>
      <h2>Add Medical Record</h2>
      <p>{date}{title}</p>
      <form onSubmit={onSubmitHandler}>
        
        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Enter Date:</label>
            <div className='col-sm-8 '>
                <input className="form-control"type="date" onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Record Title:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter record-title"
                value={title}
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Doctor Name:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter Doctor Name"
                value={doctor}
                onChange={(e)=>{
                    setDoctor(e.target.value)
                }}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Hospital Name:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter Hospital Name"
                value={hospital}
                onChange={(e)=>{
                    setHospital(e.target.value)
                }}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Body Organ:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter Body Organ"
                value={bodyOrgan}
                onChange={(e)=>{
                    setBodyOrgan(e.target.value)
                }}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Medicines:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter medicines"
                value={medicine}
                onChange={(e)=>{
                    setMedicine(e.target.value)
                }}/>
            </div>
        </div>

        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Notes:</label>
            <div className='col-sm-8'>
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter any other information"
                value={notes}
                onChange={(e)=>{
                    setNotes(e.target.value)
                }}/>
            </div>
        </div>
        
        <div className='row mb-3'>
            <label className='col-sm-4 col-form-label'>Add Files:</label>
            <div className='col-sm-8'>
                <input 
                multiple
                accept="image/*,application/pdf"
                className="form-control" 
                type="file" 
                placeholder="Enter record-title"
                onChange={fileChangeHandler}/>

                {files.length > 0 && (
                    <ul className='list-group mt-2'>
                        {files.map(({file,id},index)=>(
                            <li key={id}
                            className='list-group-item d-flex justify-content-between align-items-center'>
                            {file.name}
                                <button type="button"className='btn btn-sm btn-outline-danger'
                                onClick={()=>{removeFile(id)}}>
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
            <Buttons 
            Bcontent="Submit"
            handleClick={onSubmitHandler}/>

      </form >
    </div>
  )
}

export default Addrecords
