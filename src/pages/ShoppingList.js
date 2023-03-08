import { ShoppingListContext } from "../context/shoppingList.context"
import { useEffect, useContext } from "react"



const ShoppingList = () => {

    const { ingredients, getIngredients, setIngredients, foundIngredients } = useContext(ShoppingListContext)

   const handleInputChange = (e) => {
       setIngredients(e.target.value)
       console.log("HANDLE INPUT", ingredients)

   }

   const handleSubmit = (e) => {
    e.preventDefault()

    getIngredients(ingredients)

   }

    // useEffect(() => {
    //     // getIngredients()
    // })

    return (

        <div>
    
            <h1>Shopping List</h1>
    
            <h3>Make a List</h3>
    
            <form onSubmit={handleSubmit}>
    
                <label>Find a recipe</label>
                <input name="ingredients" type="text" placeholder="Enter ingredients..." value={ingredients} onChange={handleInputChange}/>
                <button>Submit</button>
    
            </form>
    
    
            {foundIngredients ? (
    
                <div>
    
                    {foundIngredients.map((ingredient) => {
                        return(
    
                        <div key={ingredient.id}>
                        
                                <h3>{ingredient.title}</h3>
                                <img src={ingredient.image} alt="ingredientsearch" />
    
    
                        </div>
    
                        )
                    })}
    
                </div>
    
            ) : (
    
                <h4>Loading...</h4>
            )}
    
    
    
        </div>
      )
}

export default ShoppingList