import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [monthlyData, setMonthlyData] = useState();
  const [loading, setLoading] = useState(true);

  const monthData = (month, data) => {
    return {"name": month, "Hóa đơn tiếp nhận": data};
  }

  useEffect(async ()=>{
    var data = [];
    for(let i = 1; i <= 12; i++) {
      await axios.get(`/hoadon/amountbymonth/${i}`)
      .then(async response => {
        data.push(monthData(`Tháng ${i}`, response.data.amount));
      });
    }
    setMonthlyData(data);
    setLoading(false);
  }, []);

  if(loading) return (
    <div>loading...</div>
  )

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={monthlyData} title="Phân tích số lượng hóa đơn theo tháng" grid dataKey="Hóa đơn tiếp nhận"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
