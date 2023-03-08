import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeDetails, getRecipeDetails } = useContext(LoadingContext);
  const { id } = useParams();

  useEffect(() => {
    getRecipeDetails(id);
  }, []);

  return (
    <div className="recipeDetails-details">
      <h1>Recipe Details</h1>

      {recipeDetails ? (
        <div>
          <h2>{recipeDetails.title}</h2>
          <img
            src={`https://spoonacular.com/recipeImages/${recipeDetails.id}-480x360.jpg`}
            alt={recipeDetails.title}
          />

          <p>{recipeDetails.readyInMinutes}</p>
          <p>{recipeDetails.servings / 100}</p>

          {recipeDetails.extendedIngredients.map((ingredient) => {
            return (
              <div>
                <p>{ingredient.original}</p>
              </div>
            );
          })}
          {recipeDetails.analyzedInstructions.map((instruction) => {
            return (
              <div>
                <h3>{instruction.name}</h3>
                <ol>
                  {instruction.steps.map((step) => {
                    return <li>{step.step}</li>;
                  })}
                </ol>
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

export default RecipeDetails;
