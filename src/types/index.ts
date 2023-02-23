export interface User {
  name: string;
  email: string;
  avatar?: string;
  _id?: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Chat {
  members: User[];
  messages: Message[];
}

export interface Message {
  sender: User;
  content: {
    text?: string;
    media?: string;
  };
  timestamp: number;
}
