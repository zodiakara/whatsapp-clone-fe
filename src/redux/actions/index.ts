import { DocumentRegistry } from "typescript";
import { LoginUser, RegisterUser } from "../../types";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";

export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN";

const BE_URL = process.env.REACT_APP_BE_DEV_URL;

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Chat {
  members: User[];
  messages: Message[];
}

interface Message {
  sender: User;
  content: {
    text?: string;
    media?: string;
  };
  timestamp: number;
}

export const setUserAction = (currentUser: User) => {
  return {
    type: SET_USER_INFO,
    payload: currentUser,
  };
};

//rewritten fucntion
export function getTokenAction(
  registeredUser: RegisterUser
): Promise<AnyAction> {
  return new Promise(async (resolve, reject) => {
    console.log("action fired");
    const options = {
      method: "POST",
      body: JSON.stringify(registeredUser),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(options);
    try {
      const response = await fetch(`${BE_URL}/users/account`, options);
      if (response.ok) {
        console.log("GET TOKEN res:", response);
        const data = await response.json();
        const { accesstoken } = data;
        console.log(accesstoken);
        // this one registers user and gives token back
        // const action: AnyAction = {
        //   type: SET_USER_INFO,
        //   payload: registeredUser,
        // };
        // resolve(action);
      } else {
        reject(new Error("Something went wrong"));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function loginUserAction(loggedUser: LoginUser): Promise<AnyAction> {
  return new Promise(async (resolve, reject) => {
    console.log("action fired");
    const options = {
      method: "POST",
      body: JSON.stringify(loggedUser),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${BE_URL}/users/session`, options);
      if (response.ok) {
        const data = await response.json();
        console.log("GET TOKEN res:", data);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        if (accessToken) {
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          };
          try {
            const response = await fetch(`${BE_URL}/users/me`, options);
            if (response.ok) {
              const user = await response.json();
              console.log(user);
              if (user) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                const newUser: User = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                };

                // const action: AnyAction = setUserAction(newUser);
                const action: AnyAction = {
                  type: SET_USER_INFO,
                  payload: newUser,
                };

                resolve(action);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        //this one registers user and gives token back
      } else {
        reject(new Error("Something went wrong"));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
