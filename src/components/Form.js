import { useState } from "react";

function Form({ handleAddRecipe, toggleClicked }) {
  const [obj, setObj] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    category: "breakfast",
    prepTime: "",
    cookingTime: "",
    servings: "",
    pic: "",
    edit: false,
  });
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddRecipe(obj);
    toggleClicked();
  }
  function handleImageUpload(e) {
    /*let input = document.getElementById("pic");
    let url = URL.createObjectURL(input.files[0]);
    setObj({
      ...obj,
      pic: url,
    });*/
    let input = document.getElementById("pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setObj({
        ...obj,
        pic: event.target.result,
      });
    };
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Recipe Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            x
          </div>
        </div>
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
                required
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
              <textarea
                id="instructions"
                name="instructions"
                placeholder="1. Add water..."
                onChange={(e) => handleChange(e)}
                value={obj.instructions}
              ></textarea>
            </label>
          </div>

          <div className="category">
            <label htmlFor="category">
              Category
              <select
                name="category"
                onChange={handleDropdownChange}
                value={obj.value}
              >
                <option value="breakfast">breakfast</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
                <option value="dessert">dessert</option>
                <option value="main">main</option>
                <option value="appetiser">appetiser</option>
              </select>
            </label>
          </div>

          <div className="prepTime">
            <label htmlFor="prepTime">
              Preperation Time
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                placeholder="Time in minutes e.g 20"
                onChange={(e) => handleChange(e)}
                value={obj.prepTime}
                min="1"
                max="120"
              />
            </label>
          </div>

          <div className="cookingTime">
            <label htmlFor="cookingTime">
              Cooking Time
              <input
                type="number"
                id="cookingTime"
                name="cookingTime"
                placeholder="Time in minutes e.g 20"
                onChange={(e) => handleChange(e)}
                value={obj.cookingTime}
                min="1"
                max="120"
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
          <div className="pic">
            <label htmlFor="pic">
              Picture:
              <input
                type="file"
                id="pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
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
