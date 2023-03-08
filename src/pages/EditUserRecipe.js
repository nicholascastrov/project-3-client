import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";
import { post } from "../services/authService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditUserRecipe = () => {
  const {
    user,
    userRecipeDetails,
    setUserRecipeDetails,
    getUserRecipeDetails,
  } = useContext(LoadingContext);
  const { recipeId, userId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserRecipeDetails((recent) => ({
      ...recent,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting recipe:", userRecipeDetails);

    const route = `/recipes/edit-recipe/${recipeId}/${userId}`;
    console.log("Posting to route:", route);

    post(route, userRecipeDetails)
      .then((results) => {
        console.log(results.data);
        setUserRecipeDetails(results.data);
        navigate(`/user-recipe-details/${recipeId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!userRecipeDetails) {
      getUserRecipeDetails(recipeId);
    }
  }, []);

  return (
    <div>
      <h1>Edit User Recipe</h1>

      {user && userRecipeDetails ? (
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={userRecipeDetails.title}
            onChange={handleChange}
          ></input>

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={userRecipeDetails.description}
            onChange={handleChange}
          ></input>

          <label>Image</label>
          <input
            type="text"
            name="image"
            value={userRecipeDetails.image}
            onChange={handleChange}
          ></input>

          <label>Prep Time</label>
          <input
            type="text"
            name="prep_time"
            value={userRecipeDetails.prep_time}
            onChange={handleChange}
          ></input>

          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={userRecipeDetails.servings}
            onChange={handleChange}
          ></input>

          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={userRecipeDetails.ingredients}
            onChange={handleChange}
          ></input>

          <label>Directions</label>
          <input
            type="text"
            name="directions"
            value={userRecipeDetails.directions}
            onChange={handleChange}
          ></input>

          <button type="submit">Edit Recipe</button>
        </form>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default EditUserRecipe;
