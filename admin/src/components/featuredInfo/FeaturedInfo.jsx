import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward, Person, VerifiedUser } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedInfo() {

  const [users, setUsers] = useState();
  const [hoadon, setHoadon] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user").then(response => {
      setUsers(response.data.data);
    });
    axios.get("/hoadon").then(response => {
      setHoadon(response.data.hd);
    });
    setLoading(false);
  }, []);

  if(loading) return(
    <div>loading...</div>
  )

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Đơn hàng đã tiếp nhận</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{hoadon?.length}</span>
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
