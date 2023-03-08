import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";

const Profile = () => {
  const { userRecipes, getUserRecipes, setIsLoading } = useContext(LoadingContext);

  const { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getUserRecipes(userId)
    
  }, [userId]);

  return (
    <>
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
    </>
  );
};

export default Profile;
