import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward, Person, VerifiedUser } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedInfo() {

  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    axios.get("/user").then(response => {
      setUsers(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Đơn hàng đã xử lý</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số lượng người dùng</span>
        <div className="featuredMoneyContainer">
          <Person className="featuredIcon"/>
          <span className="featuredMoney">{users?.length}</span>
        </div>
      </div>
    </div>
  );
}
