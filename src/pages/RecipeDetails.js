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
    <div className="recipe-details">
      <h1>{recipeDetails ? recipeDetails.title : "Loading..."}</h1>
      {recipeDetails && (
        <>
          <img
            src={`https://spoonacular.com/recipeImages/${recipeDetails.id}-480x360.jpg`}
            alt={recipeDetails.title}
          />
          <div>
            <p>
              Ready in: {recipeDetails.readyInMinutes}{" "}
              {recipeDetails.readyInMinutes === 1 ? "minute" : "minutes"}
            </p>
            <p>
              Serves:  
              {recipeDetails.servings / 100 === 1
                ? "1 person"
                : recipeDetails.servings / 100 + " people"}
            </p>
          </div>
          <div className="ingredients-list">
            <h2>Ingredients:</h2>
            <ul>
              {recipeDetails.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Instructions:</h2>
            {recipeDetails.analyzedInstructions.length > 0 ? (
              recipeDetails.analyzedInstructions.map((instruction) => (
                <div className="instructions-list" key={instruction.name}>
                  <h3>{instruction.name}</h3>
                  <ol>
                    {instruction.steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </div>
              ))
            ) : (
              <p>No instructions available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
