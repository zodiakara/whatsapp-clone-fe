import SingleUser from "./SingleUser";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import "../mainPage.css";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any>([]); //[
  const user = useSelector((state: RootState) => state.user.user);

  async function fetchUsers(): Promise<any> {
    const response = await fetch(`${process.env.REACT_APP_BE_DEV_URL}/users`, {
      method: "GET",
      headers: {
        //json
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setUsers(data);
    } else {
      console.log(response);
      //error
      //TODO: Set error message
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="leftSidebar">
      <div className="profileSetup">
        <div className="profileAvatar d-flex">
          <Avatar sx={{ margin: 1, height: "40px", width: "40px" }} />
          <p className="m-1 p-1">{user?.name}</p>
        </div>

        <div className="justify-between items-center">
          <button className="leftSidebarBtn mx-2 hover:bg-[#3c454c]">
            <MdPeopleAlt />
          </button>
          <button className="leftSidebarBtn mx-2 hover:bg-[#3c454c]">
            <TbCircleDashed />
          </button>
          <button className="leftSidebarBtn mx-2 hover:bg-[#3c454c]">
            <BsFillChatLeftTextFill />
          </button>
          <button className="leftSidebarBtn mx-2 hover:bg-[#3c454c]">
            <HiDotsVertical />
          </button>
        </div>
      </div>

      <div className="inputField">
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="searchChatInput"
        />
        <button
          className="filterBtn"
          //   ${
          //     filter
          //       ?
          //       :
          //   }`}
          //   onClick={() => setFilter(!filter)}
        >
          <BiFilter />
        </button>
      </div>

      {/* Chats */}
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {users.map((user: any) => (
            <SingleUser
              key={user._id}
              id={user._id}
              name={user.name}
              avatar={user.avatar}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default LeftSidebar;
