import React from 'react'
import { Button } from 'react-bootstrap'
const Buttons= ({Bcontent,handleClick}) => {
  return (
    <Button
    type="submit"
    style={{backgroundColor:'#004e64',borderRadius:'8px',border:'none' ,padding:'8px 20px' }}
    onMouseOver={(e)=>(e.target.style.backgroundColor='#457277ff')}
    onMouseOut={(e)=>(e.target.style.backgroundColor='#004e64')}
    onClick={handleClick}>
        {Bcontent}
    </Button>
  )
}

export default Buttons
