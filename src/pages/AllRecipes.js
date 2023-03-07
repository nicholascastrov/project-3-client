import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { LoadingContext } from "../context/loading.context"



 const AllRecipes = () => {


    const { recipes, getRecipes } = useContext(LoadingContext)

    useEffect(() => {
        getRecipes()
}, [])
   

  return (

    <div>

            <h1>All Recipes</h1>

            {recipes ? 



                <>

                {recipes.map((recipe) => {

                        return(

                            <div key={recipe.id}>

                                <Link to={`/recipe-details/${recipe.id}`}>

                                    <h2>{recipe.name}</h2>
                                    <img src={recipe.image} alt={recipe.name} />


                                </Link>


                            </div>
                        )
                    })
                }

                </>


                : <h4>Loading...</h4>

            }
    </div>


  )
}

export default AllRecipes
