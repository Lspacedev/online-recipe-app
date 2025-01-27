import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
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
  const [image, setImage] = useState(null);
  const [loading, setSetLoading] = useState(null);

  const navigation = useNavigate();

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
    setSetLoading(true);
    if (obj.name === "" && obj.ingredients === "" && obj.instructions === "") {
      alert("Please enter recipe information.");
      toggleClicked();
      return;
    }
    const formData = new FormData();
    formData.append("name", obj.name);
    formData.append("ingredients", obj.ingredients);
    formData.append("instructions", obj.instructions);
    formData.append("category", obj.category);
    formData.append("prepTime", obj.prepTime);
    formData.append("cookingTime", obj.cookingTime);
    formData.append("servings", obj.servings);

    formData.append("image", image);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setSetLoading(false);

      if (response.ok === true) {
        navigation(0);
      }
    } catch (error) {
      console.log(error);
    }
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
      <div className="form-div">
        <div className="form">
          <div className="form-title-close">
            <h3>Enter Recipe Information</h3>
            <div className="form-close" onClick={handleFormClose}>
              <CgClose />
            </div>
          </div>
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
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="1. Add water..."
              onChange={(e) => handleChange(e)}
              value={obj.instructions}
            ></textarea>
          </div>

          <div className="category">
            <label htmlFor="category">Category</label>
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
                min="1"
                max="50"
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
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          <button
            onClick={() => (loading ? console.log("loading") : handleSubmit())}
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
