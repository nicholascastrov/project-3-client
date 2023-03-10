import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import { get } from "../services/authService";

const Profile = () => {
  const { userRecipes, getUserRecipes, setIsLoading, user, setUser, userRecipeDetails } = useContext(LoadingContext);

  const { id } = useParams();

  
  const getIngredientUrl = (ingredient) => {
    return "https://spoonacular.com/cdn/ingredients_500x500/" + ingredient;
  };

  const deleteList = (id) => {
    get(`/list/delete/${id}`)

    .then((results) => {
      console.log("deleted", results.data)
      setUser(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log("user finally", user)
    })
  }
  
  useEffect(() => {
    setIsLoading(true);
    getUserRecipes(id)

    
  }, [id]);

  return (
    <div className="profile-div">

  <div className="profile-name">
    {user && 
      <h1>{user.name}'s Profile</h1>
    }
  </div>

  <div className="profile-lists">
    <div className="profile-shopping-list-div">
      <h2>My Shopping Lists</h2>

      {user ? user.shopping_list_created.map((shoppingList, index) => {
        return (
          <p key={index}>
            {
              shoppingList.ingredients.map((ingredient, index) => {
                return (
                  <span>

                    <span key={ingredient._id}>{ingredient.name}</span>
                    <img src={getIngredientUrl(ingredient.image)} alt="ingredientsearchprofile" className="ingredient-image-prf"/>
                    

                  </span>
                  )
              })
            }
            <button onClick={()=>deleteList(shoppingList._id)}>Delete</button>
          </p>
        )
      }) 
        :<p>no shopping list!</p> 
      }
    </div>

    <div className="profile-recipes-list">
      <h2>My Recipes</h2>

      {userRecipes ? (
        userRecipes.map((recipe) => (
          <div key={recipe._id}>
            <Link to={`/user-recipe-details/${recipe._id}`}>
              <h3>{recipe.title}</h3>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
</div>
  );
};

export default Profile;
