import React from 'react'
import Buttons from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Homecard from '../components/Homecard';
import { Card } from 'react-bootstrap';

const Norecords = () => {
  const navigate = useNavigate();
  const onAddHandler = ()=>{
    navigate('/addrecord')
    return;
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <Card className='text-center rounded-3 shadow-sm p-3'style={{ width: '24rem', backgroundColor:'#082332ff'}}>
      <Card.Title className=' fw-bold' style={{fontSize:'1.5rem',color:'white'}}>OOPS! No record found</Card.Title>
      <Card.Body>
        <p className='mb-2' style={{fontSize:'1.2rem',color:'#f4efefff'}}>kindly add data first</p>
        <Buttons Bcontent={"add record"}
        handleClick ={onAddHandler}/>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Norecords
