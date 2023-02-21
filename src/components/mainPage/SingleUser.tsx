import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SingleUser = () => {
  return (
    <Box
      className="singleUser"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Avatar sx={{ margin: 1 }} src=""></Avatar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div className="UserName">User name</div>
        <div>blablabla</div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div className="SingleUser-Time">Time</div>
        <KeyboardArrowDownIcon className="arrowIcon"></KeyboardArrowDownIcon>
      </Box>
    </Box>
  );
};

export default SingleUser;
