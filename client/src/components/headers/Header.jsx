import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async() => {
    await axios.get('/user/logout')

    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <IoMdMenu size={30} />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "AliBaba Store"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login or Register</Link>
          </li>
        )}

        <li>
          <IoCloseSharp size={30} className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <IoCartOutline size={30} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
