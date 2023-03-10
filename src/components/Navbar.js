import React from "react";
import { FaUser, FaPlus, FaSearch, FaList, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  const { user } = useContext(LoadingContext);

  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar-div">

      <nav className="navbar">

      <h1>SIEVE</h1>
        
        <Link to={"/"}>Home</Link>
        <Link to={"/all-recipes"}>All Recipes</Link>
        <Link to={"/user-recipes"}>User Recipes</Link>

        {getToken() ? (
          <>
            {user && user._id && (
              <>
                <Link to={`/add-recipe/${user._id}`}><FaPlus />Create Recipe</Link>
                <Link to={"/search-by-ingredients"}><FaSearch />What's in your Fridge?</Link>
                <Link to={'/shopping-list/:userId'}><FaList />Shopping List</Link>
                <Link to={`/profile/${user._id}`}><FaUser />Profile</Link>

                <button onClick={logout}><FaSignOutAlt/>Logout</button>
              </>
            )}
          </>
        ) : (
          <>
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
          </>
        )}
      </nav>

      {/* <hr/> */}
          
    </div>


  );
};

export default Navbar;
