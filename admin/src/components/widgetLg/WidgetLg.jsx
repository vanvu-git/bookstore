import { useEffect, useState } from "react";
import axios from "axios";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [newestHoadon, setNewestHoadon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    await axios.get(`/hoadon/latest/createdate`)
    .then(async response => {
      setNewestHoadon(response.data.hd);
      console.log(response.data.hd);
      return response.data.hd;
    });
    setLoading(false);
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">
        Hóa đơn mới nhất
      </h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Ngày</th>
          <th className="widgetLgTh">Hóa đơn</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        {
          newestHoadon.map( hd => (
            <tr className="widgetLgTr" key={hd?._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{`${hd?.makhachhang?.ho} ${hd?.makhachhang?.ten}`}</span>
              </td>
              <td className="widgetLgDate">{hd?.createdAt?.substring(0,10)}</td>
              <td className="widgetLgAmount">{hd?.tongtien}</td>
              <td className="widgetLgStatus">
                <Button type={hd?.trangthai} />
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}
