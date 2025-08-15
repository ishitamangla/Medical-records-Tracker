import React from 'react'
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
const Viewcard = ({record}) => {

    const {title,date,doctor,hospital,bodyOrgan,medicine,notes,files} = record;
    const hasText = (str) => typeof str === "string" && str.trim().length > 0;

  return (
<Card 
  style={{ 
    backgroundColor:'#eef5f5ff' , 
    borderRadius :'12px',
    boxShadow:'0px 4px 12px rgba(0,0,0,0.1)',
    transition:'transform 0.2s ease-in-out',
    color:'#112222ff',
    width:'100%'
  }}
  className='mb-4'
  onMouseEnter={(e)=>e.currentTarget.style.transform ='scale(1.03)'}
  onMouseLeave={(e)=>e.currentTarget.style.transform ='scale(1)'}
  
  >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>{new Date(date).toISOString().split("T")[0]}</div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Doctor Name :{doctor?.name||"N/A" }</ListGroup.Item>
        <ListGroup.Item>Hospital Name :{hospital?.name||"N/A" }</ListGroup.Item>
        <ListGroup.Item>Body Organ :{bodyOrgan?.name||"N/A" }</ListGroup.Item>
        <ListGroup.Item>Medicines:{medicine?.name||"N/A" }</ListGroup.Item>
        <ListGroup.Item>Note:{notes?.name||"N/A" }</ListGroup.Item>
        <ListGroup.Item>Files:{files && files.length > 0 ? (<div>
                {files.map((file,idx)=>
                    (<div key={idx} style={{ marginBottom: '1rem' }} >
                        <h6>{file.filename}   
                        <a href ={file.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                        </h6>
                </div>
                ))}
            </div>)
        :("N/A") }</ListGroup.Item>
      </ListGroup>
      
    </Card>
    
  );
}


export default Viewcard
