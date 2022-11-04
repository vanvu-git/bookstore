import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

export default function TheLoaiList() {
  // const {posts, data, loading, error} = useFetch('/tacgia');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get("/theloai").then(response => {
      setData(response.data.data);
      setLoading(false);
    })
  }, []);
  

  const handleDelete = (id) => {
    axios.delete(`/theloai/${id}`).then(()=>{
      history.push('/dstheloai');
    })
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "tentl",
      headerName: "Tên Tác Giả",
      width: 200
    },
    {
      field: "mota",
      headerName: "Mô tả",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/theloai/" + params.row._id}>
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
          <Link to='/newtheloai'>
            <button  className="userAddButton">Thêm thể loại mới</button>
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
