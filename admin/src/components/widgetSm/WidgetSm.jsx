import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [newestUsers, setNewestUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    await axios.get(`/user/find5newest`)
    .then(async response => {
      setNewestUser(response.data.data);
      return response.data.data;
    });
    setLoading(false);
  }, []);

  if(loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Người dùng mới</span>
      <ul className="widgetSmList">
        {
          newestUsers.map( u => (
            <li className="widgetSmListItem" key={u._id}>
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{`${u.ho} ${u.ten}`}</span>
                <span className="widgetSmUserTitle">Username: {u.username}</span>
              </div>
              <Link to={`/user/${u._id}`}>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
