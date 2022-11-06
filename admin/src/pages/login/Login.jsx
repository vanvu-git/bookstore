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
          const res = await axios.post("http://localhost:6010/api/auth/login", credentials);
       
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user});
          history.push('/');
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
        
      };
    return (
    <form class="form-login">
        <div class="imgcontainer">
            BookStore Admin Login
        </div>
        <div class="container-form-login">
            <input type="text" placeholder="Enter Username" name="username" required class="input-class" onChange={e => setCredentials({...credentials, username: e.target.value})} value= {credentials.username}/ >
            <input type="password" placeholder="Enter Password" name="password" required class="input-class" onChange={e => setCredentials({...credentials, password: e.target.value})} value= {credentials.password} />
            <button type="submit" class="btn-submit" onClick={handleSumit}>Login</button>  
        </div>
        
      </form>
    );
}
export default LoginForm;