import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";

const UserRecipes = () => {
  const { userRecipes, getAllUserRecipes } = useContext(LoadingContext);

  useEffect(() => {
    getAllUserRecipes();
  }, []);

  return (
<div className="user-recipes-container">
  <h1 className="user-recipes-title">User Recipes</h1>

  {userRecipes ? (
    <div className="recipe-list-container">
      {userRecipes.map((recipe) => {
        return (
          <div className="recipe-item" key={recipe._id}>
            <Link className="recipe-link" to={`/user-recipe-details/${recipe._id}`}>
              <h2 className="recipe-title">{recipe.title}</h2>
              <img className="recipe-image" src={recipe.image} alt={recipe.name} />
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <h4 className="loading-message">Loading...</h4>
  )}
</div>
  );
};

export default UserRecipes;
