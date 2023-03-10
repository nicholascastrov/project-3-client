import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { get, post } from "../services/authService";

const ShoppingListContext = createContext();

const ShoppingListProvider = ({ children }) => {

    const [ shoppingListCollection, setShoppingListCollection ] = useState(null)

    const [ shoppingList, setShoppingList ] = useState(null)

    const [ ingredients, setIngredients ] = useState('')

    const [ foundIngredients, setfoundIngredients ] = useState(null)



    const getIngredients = (ingredientName) => {
        axios
        .get(`https://api.spoonacular.com/food/ingredients/search?query=${ingredientName}&apiKey=224dd7450e7d4cfa9bf65a747f11fd61`)
        .then((response) => {
          console.log(response.data)
          setfoundIngredients(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }

    return(
        <ShoppingListContext.Provider 
        value={{
            getIngredients,
            ingredients,
            shoppingList,
            shoppingListCollection,
            setIngredients,
            foundIngredients,
            setfoundIngredients
        }}>
        {children}
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext, ShoppingListProvider };