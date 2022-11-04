import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

export default function NhaXuatBanList() {
  // const {posts, data, loading, error} = useFetch('/tacgia');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("/nhaxuatban").then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/nhaxuatban/${id}`).then(()=>{
      return <Redirect to='/nhaxuatban' />
    })
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "tennxb",
      headerName: "Tên NXB",
      width: 200
    },
    { field: "diachi", headerName: "Địa Chỉ", width: 200 },
    {
      field: "sdt",
      headerName: "Số Điện Thoại",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/nhaxuatban/" + params.row._id}>
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
          <Link to='/newnhaxuatban'>
            <button  className="userAddButton">Thêm NXB mới</button>
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
