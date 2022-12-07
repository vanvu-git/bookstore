import "../../style/list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

export default function UserList() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get("/user").then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/user/${id}`);
    setData(data.filter(item=>item._id !== id));
  };
  
  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 150
    },
    {
      field: "ho",
      headerName: "Họ",
      width: 100,
    },
    {
      field: "ten",
      headerName: "Tên",
      width: 100,
    },
    {
      field: "sdt",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "quyen",
      headerName: "Quyền",
      width: 100,
    },
    {
      field: "ngaysinh",
      headerName: "Ngày sinh",
      width: 150,
      valueGetter: (params) => {
        if(params.row.ngaysinh)
          return params.row.ngaysinh.substring(0, 10);
        return "Trống"
      } 
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
      valueGetter: (params) => {
        if(params.row.createdAt)
          return params.row.createdAt.substring(0, 10);
        return "Trống"
      } 
    },
    {
      field: "trangthai",
      headerName: "Trạng thái",
      width: 120,
      valueGetter: (params) => {
        if(params.row.trangthai) {
          return "Đang kích hoạt";
        }
        return "Bị khóa";
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
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
          <Link to='/newuser'>
            <button  className="userAddButton">Thêm người dùng mới</button>
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
