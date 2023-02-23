import { DocumentRegistry } from "typescript";
import { RegisterUser } from "../../types";

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

export const getTokenAction = (registeredUser: RegisterUser) => {
  return async () => {
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
      const response = await fetch(`${BE_URL}+"users/account"`, options);
      if (response.ok) {
        console.log("GET TOKEN res:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
