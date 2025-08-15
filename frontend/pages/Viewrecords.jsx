import React, { useEffect, useState ,useMemo} from 'react'
import Viewcard from '../components/Viewcard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const Viewrecords = () => {

  const [data,setData] = useState([]);
  const[sortBy,setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch("http://localhost:3000/api/user/fetch-details",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
          
        }
      })

     if(!response.ok){
      throw new Error(`HTTP error status :${response.status}`)
    }
    const personData = await response.json();

    if(!personData.appointments || personData.appointments.length === 0 ){
      navigate('/noRecords')
      return;
    }
  setData(personData.appointments);
  }
  catch(error){
    alert("error : ",error)
  }
}
  
fetchData();
},[navigate])
  

const filterData = useMemo(() => {
  let temp = [...data];
  switch(sortBy){
    case "Date":
      temp.sort((a,b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
        //if positive b placed first more recent
      }); 
      break;
    case "Doctor":
      temp.sort((a,b)=>
        {
          const nameA = a.doctor?.trim() || "zzzzzzzz";
          const nameB = b.doctor?.trim() || "zzzzzzzz";
          return nameA.localeCompare(nameB);
          //return 1 first string comes first
          //in alphabatical order
        })
      break;
    case "Title":
      temp.sort((a,b)=>{
          const nameA = a.title?.trim() || "zzzzzzzz";
          const nameB = b.title?.trim() || "zzzzzzzz";
          return nameA.localeCompare(nameB);
        });
      break;
    case "Hospital":
      temp.sort((a,b)=>{
          const nameA = a.hospital?.trim() || "zzzzzzzz";
          const nameB = b.hospital?.trim() || "zzzzzzzz";
          return nameA.localeCompare(nameB);
        });
      break;
      case "Body Organ":
      temp.sort((a,b)=>{
          const nameA = a.bodyOrgan?.trim() || "zzzzzzzz";
          const nameB = b.bodyOrgan?.trim() || "zzzzzzzz";
          return nameA.localeCompare(nameB);
        });
        break;
    default:
      break;
  }
  return temp;
},[sortBy,data]);


  return (

    <Container fluid className='px-4 py-3'>
      <Navbar fixed="top"  className='mb-4' variant="dark" style={{backgroundColor:'#06293d',color:'#b0c4de'}} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home" style={{ color: '#ffffff' }}>Filter</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Sort By: ${sortBy}`}
              menuVariant="dark"
            >
              <NavDropdown.Item  onClick={()=>{setSortBy("Date")}}>Date (most recent)</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{setSortBy("Doctor")}}>Doctor (A–Z)</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{setSortBy("Title")}}>Title (A–Z)</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{setSortBy("Hospital")}}>Hospital (A–Z)</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{setSortBy("Body Organ")}}>Body Organ (A–Z)</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Row className='g-4' style = {{ alignItems: 'start', marginTop: '70px' }} >
        {filterData.map((data,index)=>(
          <Col key={index} xs={12} sm={6} md={4} lg={3} className=' mb-4'>
            <Viewcard record ={data}/>
          </Col>
        ))}        
      </Row>
    </Container>
  );
}

export default Viewrecords
