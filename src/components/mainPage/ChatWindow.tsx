import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { BsEmojiLaughing } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import "./ChatWindow.css";
import { Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Message, User } from "./../../types/index.js";
import { RootState } from "../../redux/store/store";
import { io } from "socket.io-client";
import { SET_USER_INFO } from "../../redux/actions";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

const BE_URL = process.env.REACT_APP_BE_DEV_URL || process.env.REACT_APP_PROD_URL
const socket = io(BE_URL!, {
    transports: ["websocket"],
});

const ChatWindow = (props: any) => {
    const [text, setText] = useState("");
    const [audio] = useState(new Audio("/assets/notification.mp3"));
    // const [media, setMedia] = useState("");

    const [clientId, setClientId] = useState("");

    const user = useSelector((state: RootState) => state.user.user);

    //****/
    const [chatHistory, setChatHistory] = useState<Message[]>([]);

    const dispatch = useDispatch();

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resetFormValue();
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            sendMessage();
        }
    };
    const resetFormValue = () => setText("");

    useEffect(() => {
        socket.on("welcome", (clientId) => {
            console.log("welcome", clientId);
            setClientId(clientId);

            socket.emit("auth", {
                accessToken: localStorage.getItem("accessToken"),
                refreshToken: localStorage.getItem("refreshToken"),
            });
        });

        socket.on("newMessage", (newMessage) => {
            console.log("newMessage:", newMessage);
            const newObj: any = props.chatTabHistory;

            if (newObj[newMessage.sender._id]) {
                newObj[newMessage.sender._id] = [
                    ...newObj[newMessage.sender._id],
                    newMessage,
                ];
            } else {
                newObj[newMessage.sender._id] = [newMessage];
            }
            let obj = { ...props.latestChat };
            obj[newMessage.sender._id] = newMessage.content.text;
            props.setLatestChat({
                ...obj,
            });

            props.setChatTabHistory({
                ...newObj,
            });

            if (props.activeChat._id !== newMessage.sender._id)
                NotificationManager.info(
                    newMessage.content.text,
                    newMessage.sender.name,
                    5000,
                    () => {
                        props.setActiveChat(newMessage.sender);
                    }
                );

            audio.play();
        });

        socket.on("messageError", (error) => {
            console.log(error);
        });

        socket.on("accept", () => {
            console.log("You have been accepted");
        });

        return () => {
            socket.off("welcome");
            socket.off("newMessage");
            socket.off("messageError");
            socket.off("accept");
        };
    }, [props.chatTabHistory, props.latestChat]);

    const sendMessage = () => {
        const newMessage: any = {
            sender: user,
            receiver: props?.activeChat,
            content: {
                text: text,
                // media: media,
            },
            timestamp: new Date().getTime(),
        };
        socket.emit("sendMessage", newMessage);

        const newObj: any = props.chatTabHistory;

        if (newObj[newMessage.receiver._id]) {
            newObj[newMessage.receiver._id] = [
                ...newObj[newMessage.receiver._id],
                newMessage,
            ];
        } else {
            newObj[newMessage.receiver._id] = [newMessage];
        }

        let obj = { ...props.latestChat };
        obj[newMessage.receiver._id] = newMessage.content.text;
        props.setLatestChat({
            ...obj,
        });

        props.setChatTabHistory(newObj);

        // setChatHistory([...chatHistory, newMessage]);
    };
    return (
        <div className="container chatWindow p-0 m-0">
            <div className="d-flex flex-column">
                <div className="chat-header d-flex flex-row justify-content-between align-items-center px-4">
                    <div className="header-contact d-flex align-items-center">
                        <div className="header-contact-avatar">
                            <img
                                src={
                                    props?.activeChat?.avatar
                                        ? props.activeChat.avatar
                                        : "/assets/default-avatar.png"
                                }
                                alt="default avatar"
                                className="me-3"
                            />
                        </div>
                        <div className="header-contact-name">
                            {props?.activeChat?.name
                                ? props.activeChat.name
                                : "No user selected"}
                        </div>
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
                <div className="chat-area">
                    <div className="message-list">
                        {props.chatTabHistory.hasOwnProperty(
                            props?.activeChat._id
                        ) &&
                            (
                                props.chatTabHistory[
                                    props?.activeChat
                                        ._id as keyof typeof props.chatTabHistory
                                ] as any[]
                            ).map((message, index) => (
                                <div
                                    key={index}
                                    className={
                                        user._id !== message.sender._id
                                            ? "message myMessage"
                                            : "message userMessage"
                                    }
                                >
                                    <div className="d-flex flex-column">
                                        <div className="message-user">
                                            <strong>
                                                {message.sender.name}
                                            </strong>
                                        </div>
                                        <div>{message.content.text}</div>
                                        <div className="d-flex justify-content-end message-hour">
                                            {new Date(
                                                message.timestamp
                                            ).getHours()}
                                            :
                                            {new Date(
                                                message.timestamp
                                            ).getMinutes()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
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
                                <Form.Group
                                    className="form-group"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        placeholder="Type a message"
                                        onChange={onChangeHandler}
                                        value={text}
                                        onKeyDown={onKeyDownHandler}
                                        disabled={
                                            props.activeChat?._id ? false : true
                                        } //todo: enable when a user is selected
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
            <NotificationContainer />
        </div>
    );
};

export default ChatWindow;
