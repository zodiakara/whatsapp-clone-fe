import SingleUser from "./SingleUser";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import "../mainPage.css";
import { Avatar } from "@mui/material";

const LeftSidebar = () => {
  const usersList = [2, 3, 4];
  return (
    <div className="leftSidebar">
      <div className="profileSetup">
        <Avatar />
        <div className="justify-between items-center">
          <button className="leftSidebarBtn hover:bg-[#3c454c]">
            <MdPeopleAlt />
          </button>
          <button className="leftSidebarBtn hover:bg-[#3c454c]">
            <TbCircleDashed />
          </button>
          <button className="leftSidebarBtn hover:bg-[#3c454c]">
            <BsFillChatLeftTextFill />
          </button>
          <button className="leftSidebarBtn hover:bg-[#3c454c]">
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
      {usersList.map((user) => (
        <>
          <SingleUser />
        </>
      ))}
    </div>
  );
};

export default LeftSidebar;
