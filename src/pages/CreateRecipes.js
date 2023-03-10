import { useContext, useState } from "react";
import { LoadingContext } from "../context/loading.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";

const CreateRecipes = () => {
  const { user } = useContext(LoadingContext);

  const navigate = useNavigate();

  const [newRecipe, setNewRecipes] = useState({
    title: "",
    description: "",
    image: "",
    prep_time: "",
    servings: "",
    ingredients: "",
    directions: "",
  });

  const handleChange = (e) => {
    setNewRecipes((recent) => ({ ...recent, [e.target.name]: e.target.value }));
    console.log("NEW POST", newRecipe);
  };

  function adjustInputHeight(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting recipe:", newRecipe);

    const route = `/recipes/add-recipe/${user._id}`;
    console.log("Posting to route:", route);

    post(route, newRecipe)
      .then((results) => {
        navigate("/user-recipes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create-recipes">
      <h2>Create Recipes</h2>

      {user ? (
        <div className='form-group'>

            <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={newRecipe.title}
                onChange={handleChange}
            ></input>

            <label>Description</label>
            <input
                type="text"
                name="description"
                value={newRecipe.description}
                onChange={handleChange}
            ></input>

            <label>Image</label>
            <input
                type="text"
                name="image"
                value={newRecipe.image}
                onChange={handleChange}
            ></input>

            <label>Prep Time</label>
            <input
                type="text"
                name="prep_time"
                value={newRecipe.prep_time}
                onChange={handleChange}
            ></input>

            <label>Servings</label>
            <input
                type="number"
                name="servings"
                value={newRecipe.servings}
                onChange={handleChange}
            ></input>

            <label>Ingredients</label>
            <input
                type="text"
                name="ingredients"
                value={newRecipe.ingredients}
                onChange={handleChange}
            ></input>

            <label>Directions</label>
            <input
                type="text"
                name="directions"
                value={newRecipe.directions}
                onChange={handleChange}
                onInput={(e) => adjustInputHeight(e.target)}
            ></input>

            <button type="submit">Create Recipe</button>
            </form>

        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default CreateRecipes;
