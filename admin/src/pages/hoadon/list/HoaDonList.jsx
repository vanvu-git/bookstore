import "../../style/list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HoaDonList() {
  // const {posts, data, loading, error} = useFetch('/tacgia');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("/hoadon").then(response => {
      setData(response.data?.hd?.reverse());
      setLoading(false);
      console.log(data);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/hoadon/${id}`);
    setData(data.filter(item=>item._id !== id));
  };
  
  const columns = [
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
      valueGetter: (params) => {
        return new Date(params.row.createdAt).toUTCString().replace("GMT","");
      }
    },
    {
      field: "tongtien",
      headerName: "Tổng tiền",
      width: 200,
    },
    {
      field: "trangthai",
      headerName: "Trạng thái",
      width: 200,
      valueGetter: (params) => {
        if(params.row.trangthai == "ChuaXuLy") return "Chưa xử lý";
        if(params.row.trangthai == "DangXuLy") return "Đang xử lý";
        if(params.row.trangthai == "DaXacNhan") return "Đã xác nhận";
        if(params.row.trangthai == "DangGiao") return "Đang giao";
        if(params.row.trangthai == "Huy") return "Hủy";
        if(params.row.trangthai == "HoanThanh") return "Hoàn Thành";
        return params.row.trangthai;
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/hoadon/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
      
      <div className="userList">
        <h3>Danh sách hóa đơn</h3>
        <br />
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={row => row._id}
        />
      </div>
  );
  
    
}
