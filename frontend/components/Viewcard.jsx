import React from 'react'
import Card from 'react-bootstrap/Card';
import {ListGroup} from 'react-bootstrap';
const Viewcard = ({record}) => {

    const {title,date,doctor,hospital,bodyOrgan,medicine,notes,files} = record;

  return (
<Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>{date}</div>
        {!doctor.trim()} && <Card.Text>
          {doctor}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {doctor.trim() && <ListGroup.Item>{doctor}</ListGroup.Item>}
        {hospital.trim() && <ListGroup.Item>{hospital}</ListGroup.Item>}
        {bodyOrgan.trim() && <ListGroup.Item>{bodyOrgan}</ListGroup.Item>}
        {medicine.trim() && <ListGroup.Item>{medicine}</ListGroup.Item>}
        {notes.trim() && <ListGroup.Item>{notes}</ListGroup.Item>}
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
