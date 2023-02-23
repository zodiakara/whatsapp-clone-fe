import { Container, Row, Col } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import LeftSidebar from "./LeftSidebar";
import "../mainPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    function isLoggedIn(): void {
        //get access token from local storage
        const accessToken = localStorage.getItem("accessToken");
        //if access token is not null, return true
        if (!accessToken) {
            navigate("/login");
        } else {
            //grab the user info using access token, if access token fails, retrive new access token using refresh token, if refresh token fails, navigate to login page
            //TODO!!!!
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
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

export default MainPage;
