import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";

const AllRecipes = () => {
  const { recipes, getRecipes } = useContext(LoadingContext);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="all-recipes">
      <h1>All Recipes</h1>

      {recipes ? (
        <div className="all-recipe-grid">
          {recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="all-recipe-card">
                <Link to={`/recipe-details/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.name} />
                  <h2>{recipe.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default AllRecipes;
