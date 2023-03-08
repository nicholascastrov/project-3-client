import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";

const UserRecipes = () => {
  const { userRecipes, getUserRecipes } = useContext(LoadingContext);

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <div>
      <h1>User Recipes</h1>

      {userRecipes ? (
        <>
          {userRecipes.map((recipe) => {
            return (
              <div key={recipe._id}>
                <Link to={`/user-recipe-details/${recipe._id}`}>
                  <h2>{recipe.title}</h2>
                  <img src={recipe.image} alt={recipe.name} />
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default UserRecipes;
