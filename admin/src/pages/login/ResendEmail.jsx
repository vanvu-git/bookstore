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
    const { loading, error, dispatch } = useContext(AuthContext);
   

    const handleSubmit = async (e) => {
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
      <div className="loginContainer">
        <form className="loginForm">
          <div className="title">Bookstore Admin - Reset Email</div>
          <div className="inputGroup">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              placeholder="Enter Username"
              name="username" 
              required 
              className="inputField" 
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          
          <div className="inputGroup">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              name="password" 
              required 
              className="inputField" 
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button type="submit" className="submitButton" onClick={handleSubmit}>Login</button>  

          {
            error && 
            <div className="alert">
              <strong>OOPS!</strong>  {error.message};
            </div>
          }
        </form>
      </div>
    );
}
export default LoginForm;