import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const loginSubmit = async(e) => {
    e.preventDefault()
    try{
      await axios.post('/user/login', {...user})

      localStorage.setItem('firstLogin', true)

      window.location.href = '/'
    }
    catch(err){
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={user.email}
          required
          onChange={onChangeInput}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={user.password}
          required
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
