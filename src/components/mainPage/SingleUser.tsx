import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../mainPage.css";

const SingleUser = (props: any) => {
    return (
        <Box
            onClick={props.click}
            className={`singleUser${props.active ? " active" : ""}`}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    sx={{ margin: 1, height: "50px", width: "50px" }}
                    src={props.avatar}
                ></Avatar>
                <div>
                    <div className="singleUserName">{props.name}</div>
                    <div className="singleUserMsg">
                        {props.latestChat
                            ? props.latestChat.slice(0, 125) + "..."
                            : ""}
                    </div>
                </div>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <div className="SingleUser-Time">
                    {props.latestChat
                        ? new Date().getHours() + ":" + new Date().getMinutes()
                        : ""}
                </div>
                <KeyboardArrowDownIcon className="arrowIcon"></KeyboardArrowDownIcon>
            </Box>
        </Box>
    );
};

export default SingleUser;
