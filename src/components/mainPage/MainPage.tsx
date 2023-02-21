import { Container, Row, Col } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import LeftSidebar from "./LeftSidebar";
import "../mainPage.css";

const mainPage = () => {
  return (
    <div className="container">
      <Row>
        <Col xs={4}>
          <LeftSidebar />
        </Col>
        <Col xs={8}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
};

export default mainPage;
