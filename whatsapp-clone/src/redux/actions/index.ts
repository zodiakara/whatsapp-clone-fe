export const SET_USER_INFO = "SET_USER_INFO";

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
