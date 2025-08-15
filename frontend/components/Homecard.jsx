import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card'
const Homecard = ({img,cardTitle,cardText,onClickhandler,buttonContent}) => {
  return (
    <Card className='text-center rounded-3 shadow-sm'style={{ width: '24rem', backgroundColor:'whitesmoke' ,color:'#004e64'}}>
          <Card.Img className='card-img-top img-fluid  shadow-sm' variant="top"  style={{ width: '100%', height: '350px', objectPosition:'top',objectFit: 'cover',color:'white'}}  src={img} />
          <Card.Body>
            <Card.Title>{cardTitle}</Card.Title>
            <Card.Text>
              {cardText}
            </Card.Text>
            <div>
            <Button variant="primary" className=' mt-3' 
              type="submit" 
              style={{backgroundColor:'#004e64', borderRadius:'8px', border:'none',padding:'8px 20px'}}
                onClick={onClickhandler}
              onMouseOver={(e)=>(e.target.style.backgroundColor ='#457277ff')}
              onMouseOut={(e) =>(e.target.style.backgroundColor='#004e64')}
              >{buttonContent}</Button>
            </div>
            
          </Card.Body>
        </Card>
  )
}

export default Homecard
