import React, { useContext } from "react";
import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  const {user} = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">bookstore admin</span>
        </div>
        {user &&
        <div className="topRight">
          <span>Xin chào, {user.ho +" "+ user.ten}</span>
      </div>
      }
      </div>
    </div>
  );
}
