import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";

import { useParams, useNavigate } from "react-router-dom";

const UserRecipeDetails = () => {
  const { userRecipeDetails, getUserRecipeDetails, user, deleteRecipe } = useContext(LoadingContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const checkOwner = (recipeOwner, userId) => {
    console.log("Checking owner" , recipeOwner, userId)
    return recipeOwner === userId;
  };

  const handleEditClick = (recipeId, userId) => {
    navigate(`/edit-recipe/${recipeId}/${userId}`);
  };
  const handleDeleteClick = (recipeId, userId) => {
    console.log("Deleting recipe with id:", recipeId);
    deleteRecipe(recipeId, userId);
    navigate("/user-recipes");
  };

  useEffect(() => {
    getUserRecipeDetails(id);
  }, []);


  return (
    <div className="userRecipeDetails-details">

      {userRecipeDetails ? (
        <div key="user-recipe-details">
          <h2>{userRecipeDetails.title}</h2>
          <h3>{userRecipeDetails.description}</h3>
          <p>By {userRecipeDetails.author.name}</p>
          <img src={userRecipeDetails.image} alt={userRecipeDetails.title} />
          <p>Preparation Time: {userRecipeDetails.prep_time} minutes</p>
          <p>Servings: {userRecipeDetails.servings}</p>
          <h3>Ingredients:</h3>
          <ul>
            {userRecipeDetails.ingredients.map((ingredient, index) => {
              return <li key={`ingredient-${index}`}>{ingredient}</li>;
            })}
          </ul>
          <h3>Directions:</h3>
          <ol>
            {userRecipeDetails.directions.map((step, index) => {
              return <li key={`direction-${index}`}>{step}</li>;
            })}
          </ol>
          {user && checkOwner(userRecipeDetails.author._id, user._id) && (
            <div>
              <button onClick={() => handleEditClick(userRecipeDetails._id, user._id)}>Edit Recipe</button>
              <button onClick={() =>handleDeleteClick(userRecipeDetails._id, user._id)}>Delete Recipe</button>
            </div>
          )}
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default UserRecipeDetails;
