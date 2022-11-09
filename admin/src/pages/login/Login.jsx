import React, {useState, useContext} from 'react';
import './login.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
    const [ credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const history = useHistory();
    const {  loading, error, dispatch} = useContext(AuthContext);
   

    const handleSumit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/auth/login", credentials);
       
          if (res.data.quyen > 0) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user});
            history.push('/');
          } else {
            dispatch({ type: "INCORRECT_ROLE"});
            history.push('/login');
          }
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
        
      };
    return (
    <form className="form-login">
        <div className="imgcontainer">
            BookStore Admin Login
        </div>
        <div className="container-form-login">
            <input type="text" placeholder="Enter Username" name="username" required className="input-class" onChange={e => setCredentials({...credentials, username: e.target.value})} value= {credentials.username}/ >
            <input type="password" placeholder="Enter Password" name="password" required className="input-class" onChange={e => setCredentials({...credentials, password: e.target.value})} value= {credentials.password} />
            <button type="submit" className="btn-submit" onClick={handleSumit}>Login</button>  

            {error && 
            <div className="alert">
              <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
              <strong>OOPS!</strong>  {error.message};
             </div>}
        </div>
       
        
      </form>
    );
}
export default LoginForm;