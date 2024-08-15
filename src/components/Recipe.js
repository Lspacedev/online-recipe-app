import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backarrow from "./Backarrow";

function Recipe({
  recipes,
  handleUpdateRecipe,
  handleRecipeResubmit,
  handleDeleteRecipe,
  getPicLink,
}) {
  const [obj, setObj] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    category: "",
    prepTime: "",
    cookingTime: "",
    servings: "",
    pic: "",
    edit: false,
  });
  const { recipeArr } = useOutletContext();
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  //navigation
  const navigation = useNavigate();
  function handleUpdateSubmit() {
    handleRecipeResubmit(recipeArr.recipeName, obj);
    navigation(`/home/recipes/${obj.recipeName}`);
  }
  function handleBackNavigate() {
    navigation(`/home/recipes/`);
  }
  function handleDeleSubmit() {
    handleDeleteRecipe(recipeArr && recipeArr.recipeName);
    navigation("/home/recipes");
  }
  function handleImageUpload(e) {
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

  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  let currRecipe;
  let edit;
  if (recipeArr) {
    const [curr] = recipes.filter(
      (recipe) => recipe.recipeName === recipeArr.recipeName
    );

    currRecipe = curr;
    edit = currRecipe.edit;
  }

  console.log("recipes in Recipe.js", recipes, currRecipe);
  return (
    <div className="Recipe">
      <Backarrow handleBackNavigate={handleBackNavigate} />
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
                <textarea
                  id="instructions"
                  name="instructions"
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
                  onChange={(e) => handleChange(e)}
                  value={obj.prepTime}
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
          </div>
        ) : (
          <div className="recipe-info">
            <h1>{currRecipe && currRecipe.recipeName}</h1>
            <div className="category-text">
              <p>{currRecipe && currRecipe.category}</p>
            </div>
            <img
              src={currRecipe && getPicLink(currRecipe)}
              alt="recipe"
              id="recipe-pic"
            />
            <div className="prep-cook-serve">
              <div className="prep-text">
                <div className="recipe-sub-head">Prep Time</div>
                <p>{currRecipe && currRecipe.prepTime}min</p>
              </div>
              <div className="cook-text">
                <div className="recipe-sub-head">Cook Time</div>
                <p>{currRecipe && currRecipe.cookingTime}min</p>
              </div>
              <div className="serve-text">
                <div className="recipe-sub-head">Servings</div>
                <p>{currRecipe && currRecipe.servings}</p>
              </div>
            </div>

            <div className="ingredients-div">
              <h3>Ingredients</h3>
              <div className="ingredients-text">
                {currRecipe && currRecipe.ingredients}
              </div>
            </div>
            <div className="instructions-div">
              <h3>Instructions</h3>
              <div className="instructions-text">
                {currRecipe && currRecipe.instructions}
              </div>
            </div>
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
              edit
                ? handleUpdateSubmit()
                : handleUpdateRecipe(recipeArr && recipeArr.recipeName);
            }}
          >
            {edit ? <div className="update-btn">Update </div> : <div>edit</div>}
          </button>

          <button className="delete" onClick={() => handleDeleSubmit()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Recipe;
