import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { BsEmojiLaughing } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import "./ChatWindow.css";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Message, User } from "./../../types/index.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ChatWindow = () => {
  const [message, setMessage] = useState<null | Message>(null);
  const [text, setText] = useState("");
  // const [media, setMedia] = useState("");
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.user);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      setMessage({
        sender: userData.name,
        content: {
          text: text,
          // media: media,
        },
        timestamp: new Date().getTime(),
      });
    }
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  useEffect(() => {
    console.log("userData: ", userData);
    console.log("MESSAGE", message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <div className="container chatWindow p-0">
      <div className="d-flex flex-column">
        <div className="chat-header d-flex flex-row justify-content-between align-items-center px-4">
          <div className="header-contact d-flex align-items-center">
            <div className="header-contact-avatar">
              <img
                src="/assets/default-avatar.png"
                alt="default avatar"
                className="me-3"
              />
            </div>
            <div className="header-contact-name">Lorem Ipsum</div>
          </div>
          <div className="header-options d-flex align-items-center">
            <div className="header-icon me-4">
              <HiSearch />
            </div>
            <div className="header-icon">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>
        <div className="chat-area"></div>
        <div className="chat-footer d-flex justify-content-between align-items-center px-4">
          <div className="d-flex align-items-center chat-footer-left">
            <div className="d-flex align-items-center me-3">
              <div className="footer-icon message-emoji">
                <BsEmojiLaughing />
              </div>
              <div className="footer-icon message-attachment ms-3">
                <RiAttachment2 />
              </div>
            </div>
            <div className="footer-message d-flex align-items-center">
              <Form className="form" onSubmit={onSubmitHandler}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Type a message"
                    onChange={onChangeHandler}
                    value={text}
                    onKeyDown={onKeyDownHandler}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="footer-mic ms-3">
            <div className="footer-icon">
              <FaMicrophone />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
