import React from 'react'
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
const Viewcard = ({record}) => {

    const {title,date,doctor,hospital,bodyOrgan,medicine,notes,files} = record;
    const hasText = (str) => typeof str === "string" && str.trim().length > 0;

  return (
<Card 
  style={{ 
    backgroundColor:'#759fadff' , 
    width: '18rem' ,
    borderRadius :'12px',
    boxShadow:'0px 4px 12px rgba(0,0,0,0.1)',
    transition:'transform 0.2s ease-in-out'
  }}
  className='mb-4 mt-3 mx-auto'
  onMouseEnter={(e)=>e.currentTarget.style.transform ='scale(1.03)'}
  onMouseLeave={(e)=>e.currentTarget.style.transform ='scale(1)'}
  
  >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>{new Date(date).toISOString().split("T")[0]}</div>
        {hasText(doctor) && <Card.Text>
          {doctor}
        </Card.Text>}
      </Card.Body>
      <ListGroup className="list-group-flush">
        {hasText(doctor) && <ListGroup.Item>{doctor}</ListGroup.Item>}
        {hasText(hospital) && <ListGroup.Item>{hospital}</ListGroup.Item>}
        {hasText(bodyOrgan) && <ListGroup.Item>{bodyOrgan}</ListGroup.Item>}
        {hasText(medicine) && <ListGroup.Item>{medicine}</ListGroup.Item>}
        {hasText(notes) && <ListGroup.Item>{notes}</ListGroup.Item>}
        {files && files.length > 0 && 
            <div>
                {files.map((file,idx)=>
                    (<div> 
                        <span>{file.name}</span>
                        {' '}
                        <a href ={file.url} target="_blank" rel="noopener noreferrer">View</a>
                        {' | '}
                        <a href ={file.url} download>Download</a>
                </div>
                ))}
            </div>
        }
      </ListGroup>
      
    </Card>
    
  );
}


export default Viewcard
