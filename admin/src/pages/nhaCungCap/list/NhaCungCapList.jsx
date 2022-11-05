import "../../style/list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NhaCungCapList() {
  // const {posts, data, loading, error} = useFetch('/tacgia');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("/nhacungcap").then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/nhacungcap/${id}`);
    setData(data.filter(item=>item._id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "tenncc",
      headerName: "Tên NCC",
      width: 120
    },
    { field: "diachi", headerName: "Địa Chỉ", width: 250 },
    {
      field: "sdt",
      headerName: "Số Điện Thoại",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/ncc/" + params.row._id}>
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
          <Link to='/newncc'>
            <button  className="userAddButton">Thêm NCC mới</button>
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
