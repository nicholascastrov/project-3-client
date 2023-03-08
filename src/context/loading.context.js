import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { get, post } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(null);

  const [recipes, setRecipes] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);

  const [userRecipes, setUserRecipes] = useState(null);
  const [userRecipeDetails, setUserRecipeDetails] = useState(null);

  const [ searchByIngredients, setSearchByIngredients ] = useState(null);

  const [ ingredients, setIngredients ] = useState(null)


  const setTimedMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const getRecipeByIngredients = (ingredient) => {
    axios
    .get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=224dd7450e7d4cfa9bf65a747f11fd61`)
    .then((response) => {
      console.log("New API call", response)
      setSearchByIngredients(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteRecipe = (recipeId, userId) => {
    setIsLoading(true);
    post(`/recipes/delete-recipe/${recipeId}/${userId}`)
      .then((response) => {
        console.log("Deleted Recipe", response.data);
        getUserRecipes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserRecipes = () => {
    get("/recipes/user-recipes")
      .then((results) => {
        console.log("ALL USER RECIPES", results.data);
        setUserRecipes(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserRecipeDetails = (recipeId) => {
    get(`/recipes/user-recipe-details/${recipeId}`)
      .then((results) => {
        console.log("User Recipe Detail", results.data);
        setUserRecipeDetails(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecipes = () => {
    if (!recipes) {
      console.log("Calling API");
      axios
        .get(
          "https://api.spoonacular.com/food/search?apiKey=224dd7450e7d4cfa9bf65a747f11fd61&number=20"
        )
        .then((response) => {
          console.log(response.data);
          setRecipes(response.data.searchResults[0].results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRecipeDetails = (id) => {
    const existingRecipeDetails = recipeDetails && recipeDetails.id === id;
    if (existingRecipeDetails) {
      setIsLoading(false);
      navigate(`/recipe-details/${id}`);
      return;
    }

    setIsLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=224dd7450e7d4cfa9bf65a747f11fd61`
      )
      .then((response) => {
        console.log("RESPONSE", response.data);
        setIsLoading(false);
        setRecipeDetails(response.data);
        navigate(`/recipe-details/${id}`);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <LoadingContext.Provider
      value={{
        deleteRecipe,
        setUser,
        user,
        setMessage,
        setTimedMessage,
        setIsLoading,
        isLoading,
        getRecipes,
        recipes,
        getRecipeDetails,
        getUserRecipeDetails,
        recipeDetails,
        getUserRecipes,
        userRecipes,
        setUserRecipeDetails,
        userRecipeDetails,
        searchByIngredients, 
        setSearchByIngredients,
        getRecipeByIngredients,
        ingredients,
        setIngredients,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
