import { ShoppingListContext } from "../context/shoppingList.context";
import { useEffect, useContext, useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import Select from 'react-select'

const ShoppingList = () => {
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([]);

  const { ingredients, getIngredients, setIngredients, foundIngredients } = useContext(ShoppingListContext);

  const { setUser, user } = useContext(LoadingContext);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
    console.log("HANDLE INPUT", ingredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getIngredients(ingredients);
    setIngredients('')
  };

  const getIngredientUrl = (ingredient) => {
    return "https://spoonacular.com/cdn/ingredients_500x500/" + ingredient;
  };

  const addIngredient = (ingredient) => {
    setIngredientList([...ingredientList, ingredient]);
  };

  const addList = () => {
    post("/list/new-shopping-list", {
      ingredients: ingredientList,
    })
      .then((results) => {
        console.log("User after list", results.data);
        setUser(results.data);
      })
      .catch((err) => {
        
        console.log("List error", err);
      })
      .finally(() => {
        
        navigate(`/profile/${user._id}`);
      })
  };

  const removeIngredient = (ingredient) => {
    let newList = [...ingredientList].filter((ing) => ing !== ingredient)
    setIngredientList(newList)

  }

  return (
<div className="shopping-list-container">
  <h1>Shopping List</h1>

  <div className="make-list-container">
    <h3>Make a Shopping List</h3>

    <form onSubmit={handleSubmit}>
      <label>Find a recipe</label>
      <input
        name="ingredients"
        type="text"
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={handleInputChange}
      />
      <button>Submit</button>
    </form>
  </div>

  <div className="list-results-container">
    {ingredientList.length ? (
      <div>
        {ingredientList.map((ingredient) => {
          return (
            <div key={ingredient.id} className="ingredient-item">
              <img
                src={getIngredientUrl(ingredient.image)}
                alt="ingredientsearch"
                className="ingredient-image"
              />
              <span>{ingredient.name}</span>
              <button onClick={()=>removeIngredient(ingredient)}>remove</button>
            </div>
          );
        })}
        <button onClick={addList}>Save Shopping List</button>
      </div>
    ) : (
      <hr className="divider"/>
    )}

    {foundIngredients ? (
      <div className="search-results">
        {foundIngredients.results.map((ingredient) => {
          return (
            <div key={ingredient.id} className="ingredient-item">
              <h3>{ingredient.name}</h3>
              <img
                src={getIngredientUrl(ingredient.image)}
                alt="ingredientsearch"
                className="ingredient-image"
              />
              <button onClick={() => addIngredient(ingredient)}>
                Add Ingredient
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <h4>Loading...</h4>
    )}
  </div>
</div>
  );
};

export default ShoppingList;
