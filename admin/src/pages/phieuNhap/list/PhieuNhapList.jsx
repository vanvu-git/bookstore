import "../../style/list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PhieuNhapList() {
  // const {posts, data, loading, error} = useFetch('/tacgia');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("/phieunhap").then(response => {
      setData(response.data.data.reverse());
      setLoading(false);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/phieunhap/${id}`);
    setData(data.filter(item=>item._id !== id));
  };
  
  const columns = [
    { 
      field: "ngaynhap", 
      headerName: "Ngày nhập hàng", 
      width: 200 
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
        if(params.row.trangthai == true) {
          return "Đã xử lý"
        }
        return "Chưa xử lý"
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/phieunhap/" + params.row._id}>
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
        <div>
          <Link to='/newphieunhap'>
            <button  className="userAddButton">Thêm phiếu nhập mới</button>
          </Link>
        </div>
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
