export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CHATS = "SET_CHATS";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";

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
