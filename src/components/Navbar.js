import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoadingContext } from '../context/loading.context'
import { AuthContext } from '../context/auth.context'

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem('authToken')
      }
    const { user } = useContext(LoadingContext)

    const { logout } = useContext(AuthContext)

    return (
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/posts'}>Posts</Link>
          <Link to={'/all-recipes'}>All Recipes</Link>
          <Link to={'/user-recipes'}>User Recipes</Link>
    
          {getToken() ? (
            <>
              {user && user._id && (
                <>
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                  <Link to={`/add-recipe/${user._id}`}>New Recipe</Link>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </>
          ) : (
            <>
              <Link to={'/signup'}>Signup</Link>
              <Link to={'/login'}>Login</Link>
            </>
          )}
        </nav>
      )
    }
    
    export default Navbar