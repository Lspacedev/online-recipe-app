import { useState } from "react";

function Form({ handleAddRecipe, toggleClicked }) {
  const [obj, setObj] = useState({
    recipeName: "",
    ingredients: "", 
    instructions: "", 
    category: "", 
    prepTime: "", 
    cookingTime: "", 
    servings: "",
    edit: false,
  });
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    handleAddRecipe(obj);
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
        <div className="form-close" onClick={handleFormClose}>
          x
        </div>
      <div className="form-div">
        <h3>Enter Recipe Information</h3>

        <form>
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

          <input
            id="task-add-submit"
            type="submit"
            value="submit"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Form;