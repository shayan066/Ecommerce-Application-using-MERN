import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const registerSubmit = async(e) => {
    e.preventDefault()
    try{
      await axios.post('/user/register', {...user})

      localStorage.setItem('firstRegister', true)

      window.location.href = '/'
    }
    catch(err){
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="register-page">
      <form onSubmit={registerSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={user.name}
          required
          onChange={onChangeInput}
        />
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
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
