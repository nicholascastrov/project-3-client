import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loading.context";

import { useParams, useNavigate } from "react-router-dom"


const UserRecipeDetails = () => {
    const { userRecipeDetails, getUserRecipeDetails, user, deleteRecipe } = useContext(LoadingContext);
    const { id } = useParams();

    const navigate = useNavigate()


    const checkOwner = (recipeOwner, userId) => {
        return (recipeOwner === userId)
    }

    const handleEditClick = (recipeId, userId) => {
        navigate(`/edit-recipe/${recipeId}/${userId}`)
    }
    const handleDeleteClick = (recipeId) => {
        console.log("Deleting recipe with id:", recipeId);
        deleteRecipe(recipeId, user._id);
        navigate("/user-recipes")
      };

    useEffect(() => {
        getUserRecipeDetails(id)
    }, [])
  
    return (
        <div className="userRecipeDetails-details">

            <h1>Recipe Details</h1>

            {userRecipeDetails ? (

            <div>
                <div key="user-recipe-details">
                <h2>{userRecipeDetails.title}</h2>
                <h4>{userRecipeDetails.author}</h4>
                <img src={userRecipeDetails.image} alt={userRecipeDetails.name} />
                <p>{userRecipeDetails.prep_time}</p>
                <p>{userRecipeDetails.servings}</p>
                <p>{userRecipeDetails.directions}</p>
                {userRecipeDetails.ingredients.map((ingredient) => {
                    return <p>{ingredient}</p>
                })}

                {user && checkOwner(userRecipeDetails.author, user._id) && (

                    <div>
                        <button onClick={()=>handleEditClick(userRecipeDetails._id, user._id)}>Edit Recipe</button>
                        <button onClick={()=>handleDeleteClick(userRecipeDetails._id, user._id)}>Delete Recipe</button>
                    </div>

                )}

                </div>
                
            </div>

            ) : (

            <h4>Loading...</h4>

            )}

      </div>
    );
  };
  
    
    export default UserRecipeDetails;