import { Container, Row, Col } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import LeftSidebar from "./LeftSidebar";
import "../mainPage.css";

const mainPage = () => {
  return (
    <Container className="mainContainer">
      <Row>
        <Col xs={4}>
          <LeftSidebar />
        </Col>
        <Col xs={8}>
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default mainPage;
