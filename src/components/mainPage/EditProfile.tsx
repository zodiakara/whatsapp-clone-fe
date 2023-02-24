import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import "../mainPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("user edit user", user);
  return (
    <div className="editProfileBar">
      <div className="profileEditBg">
        <div className="mb-2">
          {" "}
          <button className="editPageBtn">
            <ArrowBackIcon sx={{ color: ["white"] }} />{" "}
          </button>
          Profile
        </div>
      </div>

      <div className="profileEditAvatar">
        <button className="editPageBtn">
          <Avatar
            sx={{ margin: 3, height: "150px", width: "150px" }}
            src={user.avatar}
          ></Avatar>
        </button>
      </div>
      <div className="profileEditNameContainer flex justify-content-center">
        <div className="profileEditName"> Your Name</div>
        <div className="profileWriteName">
          <div>{user.name} user name</div>
          <button className="editPageBtn">
            <EditIcon sx={{ color: ["#bdbdbd"] }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
