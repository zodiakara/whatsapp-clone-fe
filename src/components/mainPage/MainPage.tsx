import { Container, Row, Col } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import LeftSidebar from "./LeftSidebar";
import "../mainPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { SET_USER_INFO } from "../../redux/actions";
import EditProfile from "./EditProfile";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get redux state
  //SET_USER_INFO
  const user = useSelector((state: RootState) => state.user.user);
  async function isLoggedIn(): Promise<any> {
    //get access token from local storage
    const accessToken = localStorage.getItem("accessToken");
    //if access token is not null, return true
    if (!accessToken) {
      console.log("redirecting to /login 1");
      navigate("/login");
    } else {
      console.log(1);
      //grab the user info using access token, if access token fails, retrive new access token using refresh token, if refresh token fails, navigate to login page
      //TODO!!!!
      if (!user) {
        //fetch user info
        const response = await fetch(
          `${process.env.REACT_APP_BE_DEV_URL}/users/me`,
          {
            method: "GET",
            headers: {
              //json
              "Content-Type": "application/json",
              //access token
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        if (response.ok) {
          //user is fetched and available in redux state
          const data = await response.json();
          console.log(data);
          //dispatch action to update redux state
          dispatch({ type: SET_USER_INFO, payload: data });
        } else {
          console.log(response);
          if (response.status === 401) {
            //access token is invalid, try to get new access token using refresh token
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              //refresh token is available
              const response2 = await fetch(
                `${process.env.REACT_APP_BE_DEV_URL}/users/session/refresh`,
                {
                  method: "POST",
                  headers: {
                    //json
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    currentRefreshToken: refreshToken,
                  }),
                }
              );

              if (response2.ok) {
                //new access token is fetched
                const data = await response2.json();
                console.log(data);
                //update access token in local storage
                localStorage.setItem("accessToken", data.accessToken);
                //update refresh token in local storage
                localStorage.setItem("refreshToken", data.refreshToken);
                //fetch user info
                const response = await fetch(
                  `${process.env.REACT_APP_BE_DEV_URL}/users/me`,
                  {
                    method: "GET",
                    headers: {
                      //json
                      "Content-Type": "application/json",
                      //access token
                      Authorization: "Bearer " + data.accessToken,
                    },
                  }
                );

                if (response.ok) {
                  //user is fetched and available in redux state
                  const data = await response.json();
                  console.log(data);
                  //dispatch action to update redux state
                  dispatch({
                    type: SET_USER_INFO,
                    payload: data,
                  });
                } else {
                  console.log(response);
                  //redirect to login page
                  navigate("/login");
                }
              } else {
                //redirect to login page
                navigate("/login");
              }
            } else {
              //redirect to login page
              navigate("/login");
            }
          } else {
            //redirect to login page
            navigate("/login");
          }
        }
      } else {
        //user is fetched and available in redux state
        console.log(user, "user is fetched and available in redux state");
      }
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <div className="mainContainer">
      <Row>
        <Col xs={4} className="p-0 m-0">
          <LeftSidebar />
          {/* {EditProfile && <EditProfile/>}   */}
        </Col>
        <Col xs={8} className="p-0 m-0">
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
