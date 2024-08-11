import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Recipe({recipes, handleUpdateRecipe, handleRecipeResubmit, handleDeleteRecipe}){
    const [obj, setObj] = useState({
        recipeName: "",
          ingredients: "",
          instructions: "",
          category: "",
          prepTime: "",
          cookingTime: "",
          servings: "",
          edit: false
      });
      const {recipeArr} = useOutletContext();
      function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setObj((prev) => ({ ...prev, [name]: value }));
      }
    

    const [currRecipe] = recipes.filter((recipe)=>recipe.recipeName === recipeArr.recipeName);
    

    let edit = currRecipe.edit;
    

    
    return (
        <div className="Recipe">
      <div className="recipe-content">
        {edit === true ? (
          <div className="update-form">
            <div className="name">
                <label htmlFor="recipe-name">
                Recipe Name
                <input
                    type="text"
                    id="recipe-name"
                    name="recipeName"
                    onChange={(e) => handleChange(e)}
                    value={obj.recipeName}
                />
                </label>
            </div>

            <div className="ingredients">
                <label htmlFor="ingredients">
                Ingredients
                <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    onChange={(e) => handleChange(e)}
                    value={obj.ingredients}
                />
                </label>
            </div>
        

            <div className="instructions">
                <label htmlFor="instructions">
                Instructions
                <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    onChange={(e) => handleChange(e)}
                    value={obj.instructions}
                />
                </label>
            </div>

            <div className="category">
                <label htmlFor="category">
                Category
                <input
                    type="text"
                    id="category"
                    name="category"
                    onChange={(e) => handleChange(e)}
                    value={obj.category}
                />
                </label>
            </div>

            <div className="prepTime">
                <label htmlFor="prepTime">
                Preperation Time
                <input
                    type="text"
                    id="prepTime"
                    name="prepTime"
                    onChange={(e) => handleChange(e)}
                    value={obj.prepTime}
                />
                </label>
            </div>

            <div className="cookingTime">
                <label htmlFor="cookingTime">
                Cooking Time
                <input
                    type="text"
                    id="cookingTime"
                    name="cookingTime"
                    onChange={(e) => handleChange(e)}
                    value={obj.cookingTime}
                />
                </label>
            </div>
            <div className="servings">
                <label htmlFor="servings">
                Servings
                <input
                    type="text"
                    id="servings"
                    name="servings"
                    onChange={(e) => handleChange(e)}
                    value={obj.servings}
                />
                </label>
            </div>
          </div>
        ) : (
          <div className="recipe-info">
            {JSON.stringify(currRecipe)}
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
                edit ? handleRecipeResubmit(recipeArr.recipeName, obj) : handleUpdateRecipe(recipeArr.recipeName);
            }}
          >
            {edit ? (
              <div className="update-btn">Update </div>
            ) : (
              <div>edit</div>
            )}
          </button>

          <button className="delete" onClick={() => handleDeleteRecipe(recipeArr.recipeName)}>
            del
          </button>
        </div>
      </div>
    </div>
    )
}
export default Recipe