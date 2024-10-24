import { useState } from "react";

function Form({ toggleClicked }) {
  const [obj, setObj] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "breakfast",
    prepTime: "",
    cookingTime: "",
    servings: "",
  });
  const token = localStorage.getItem("token");

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...obj,
          prepTime: Number(obj.prepTime),
          cookingTime: Number(obj.cookingTime),
          servings: Number(obj.servings),
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    toggleClicked();
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
        <div className="form">
          <div className="name">
            <label htmlFor="recipe-name">
              Recipe Name
              <input
                type="text"
                id="recipe-name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={obj.name}
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
                type="number"
                id="servings"
                name="servings"
                onChange={(e) => handleChange(e)}
                value={obj.servings}
              />
            </label>
          </div>
          {/* <div className="pic">
            <label htmlFor="pic">
              Picture:
              <input
                type="file"
                id="pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div> */}

          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
