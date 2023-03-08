import './App.css';
import { Route, Routes, Link, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AllRecipes from './pages/AllRecipes';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipes from './pages/CreateRecipes';
import UserRecipes from './pages/UserRecipes';
import UserRecipeDetails from './pages/UserRecipeDetails'
import EditUserRecipe from './pages/EditUserRecipe';
import SearchRecipeByIngredients from './pages/SearchRecipeByIngredients';
import ShoppingList from './pages/ShoppingList';


function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (

    <div>

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />}/>
        <Route path='/all-recipes' element={<AllRecipes />}/>
        <Route path='/recipe-details/:id' element={<RecipeDetails />}/>
        <Route path='/user-recipes' element={<UserRecipes />} />
        <Route path='/user-recipe-details/:id' element={<UserRecipeDetails />} />

        <Route element={<LoggedIn />}>

          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/add-recipe/:userId' element={<CreateRecipes />} />
          <Route path='/edit-recipe/:recipeId/:userId' element={<EditUserRecipe />} />
          <Route path='/search-by-ingredients' element={<SearchRecipeByIngredients />} />
          <Route path='/shopping-list/:userId' element={<ShoppingList />} />

        </Route>



        <Route element={<NotLoggedIn />}>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          
        </Route>

      </Routes>

    </div>

  );
}

export default App;
