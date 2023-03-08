import { LoadingContext } from "../context/loading.context"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"

const SearchRecipeByIngredients = () => {

    const { searchByIngredients, getRecipeByIngredients } = useContext(LoadingContext)

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const handleSubmit = (e) => {
        e.preventDefault()

        getRecipeByIngredients(searchTerm)

    }

  return (

    <div>

        <h1>What's In Your Fridge</h1>

        <h3>Don't know what to cook?</h3>

        <form onSubmit={handleSubmit}>

            <label>Find a recipe</label>
            <input name="searchTerm" type="text" placeholder="Enter ingredients..." value={searchTerm} onChange={handleInputChange}/>
            <button>Submit</button>

        </form>


        {searchByIngredients ? (

            <div>

                {searchByIngredients.map((recipe) => {
                    return(

                    <div key={recipe.id}>
                        <Link to={`/recipe-details/${recipe.id}`}>

                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt="recipesearch" />
                            {/* <p>{recipe.ingredients.join(", ")}</p> */}

                        </Link>

                    </div>

                    )
                })}

            </div>

        ) : (

            <h4>Search for recipes by ingredients...</h4>
        )}



    </div>
  )
}

export default SearchRecipeByIngredients