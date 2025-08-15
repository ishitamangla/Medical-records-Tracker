import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Homecard from "../components/Homecard";
import addImg from "../src/assets/addrecord.png";
import viewImg from "../src/assets/viewrecord.png";
const Home = () => {
  const navigate = useNavigate();
  const addRecordHandler = () => {
    navigate("/addrecord");
  };
  const viewRecordHandler = () => {
    navigate("/viewRecord");
  };

  return (
    <Container className="align-items-center max-width d-flex flex-column mt-5">
      <Row>
        <Col>
          <h1 className="text-center my-4 fw-bold" style={{ color: "white" }}>
            Medical Tracker Dashboard
          </h1>
        </Col>
      </Row>
      <Row display:flex>
        <Col>
          <Homecard
            img={addImg}
            cardTitle={"Add New Record"}
            cardText={"Save a new medical report, prescription, or scan."}
            onClickhandler={addRecordHandler}
            buttonContent={"Add My Record"}
          />
        </Col>
        <Col>
          <Homecard
            img={viewImg}
            cardTitle={"View My Records"}
            cardText={"See all your medical history and reports"}
            onClickhandler={viewRecordHandler}
            buttonContent={"View Records"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
