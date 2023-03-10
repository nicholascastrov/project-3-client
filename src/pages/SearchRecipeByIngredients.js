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

    <div className="recipe-by-ingredients-div">

        <h1>What's In Your Fridge</h1>

        <h3>Don't know what to cook?</h3>

        <form className="recipe-by-ingredients-form" onSubmit={handleSubmit}>

            <label>Find a recipe</label>
            <p>Type in the ingredients that you want to use</p>
            <p>We'll take care of the rest</p>
            <input name="searchTerm" type="text" placeholder="Type ingredients separated by commas..." value={searchTerm} onChange={handleInputChange}/>
            <button>Submit</button>

        </form>


        {searchByIngredients ? (

            <div className="recipe-by-ingredient">

                {searchByIngredients.map((recipe) => {
                    return(

                    <div className="recipe-card" key={recipe.id}>
                        <Link to={`/recipe-details/${recipe.id}`}>

                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <p>Missed ingredients: {recipe.missedIngredientCount}</p>
                        <p>Used ingredients: {recipe.usedIngredientCount}</p>
                        <p>Unused ingredients: {recipe.unusedIngredients.length}</p>
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">View recipe</a>

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