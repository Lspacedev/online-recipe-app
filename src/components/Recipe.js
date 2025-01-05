import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backarrow from "./Backarrow";
import { IoTime } from "react-icons/io5";
import { RiBowlFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [obj, setObj] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    prepTime: "",
    cookingTime: "",
    servings: "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  useEffect(() => {
    fetchRecipe();
  }, []);
  const token = localStorage.getItem("token");

  async function fetchRecipe() {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${recipe_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok === true) {
        setObj((prev) => ({ ...prev, name: data.name }));
        setObj((prev) => ({ ...prev, ingredients: data.ingredients }));
        setObj((prev) => ({ ...prev, instructions: data.instructions }));
        setObj((prev) => ({ ...prev, category: data.category }));
        setObj((prev) => ({ ...prev, prepTime: data.prepTime }));
        setObj((prev) => ({ ...prev, cookingTime: data.cookingTime }));
        setObj((prev) => ({ ...prev, servings: data.servings }));
        setRecipe(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  //navigation
  const navigation = useNavigate();
  function openForm() {
    setEdit(!edit);
  }
  function handleBackNavigate() {
    navigation(`/home/recipes`);
  }
  async function deleteRecipe() {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete recipe?"
    );
    if (deleteConfirmation) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipe_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok === true) {
          alert("Delete succesful");
          navigation("/home/recipes");
          navigation(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updateRecipe() {
    if (
      !obj.name &&
      !obj.ingredients &&
      !obj.instructions &&
      !obj.category &&
      !obj.cookingTime &&
      !obj.prepTime &&
      !obj.servings
    ) {
      alert("Error! No update information was entered!");
      setEdit(false);
      return;
    }
    let updateConfirmation = window.confirm(
      "You are about to update recipe information. Continue?"
    );
    if (updateConfirmation) {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipe_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(obj),
          }
        );
        if (response.ok === true) {
          alert("Update success");
          //navigation(0);
        }
        setLoading(false);
        setEdit(false);
        fetchRecipe();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setEdit(false);
    }
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
  function getPicLink(obj) {
    if (obj.imageUrl === null || obj.imageUrl === "") {
      if (obj.category === "breakfast") {
        return "/images/breakfast.jpg";
      } else if (obj.category === "lunch") {
        return "/images/lunch.jpg";
      } else if (obj.category === "dinner") {
        return "/images/dinner.jpg";
      } else if (obj.category === "dessert") {
        return "/images/dessert.jpg";
      } else if (obj.category === "main") {
        return "/images/main.jpg";
      } else if (obj.category === "appetiser") {
        return "/images/appetiser.jpg";
      }
    } else {
      return obj.imageUrl;
    }
  }
  if (loading) return <div className="loading">Laoding...</div>;
  return (
    <div className="Recipe">
      <Backarrow handleBackNavigate={handleBackNavigate} />
      <div className="recipe-content">
        {edit === true ? (
          <div className="update-form">
            <div className="close" onClick={() => setEdit(false)}>
              <CgClose />
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
                  min="1"
                  max="120"
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
                  min="1"
                  max="120"
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
          </div>
        ) : (
          <div className="recipe-info">
            <h1>{recipe && recipe.name}</h1>
            <div className="category-text">
              <p>{recipe && recipe.category}</p>
            </div>
            <img
              src={recipe && getPicLink(recipe)}
              alt="recipe"
              id="recipe-pic"
            />
            <div className="prep-cook-serve">
              <div className="prep-text">
                <div className="recipe-sub-head">
                  <IoTime /> Prep Time
                </div>
                <p>{recipe && recipe.prepTime}min</p>
              </div>
              <div className="cook-text">
                <div className="recipe-sub-head">
                  <IoTime /> Cook Time
                </div>
                <p>{recipe && recipe.cookingTime}min</p>
              </div>
              <div className="serve-text">
                <div className="recipe-sub-head">
                  <RiBowlFill />
                  Servings
                </div>
                <p>{recipe && recipe.servings}</p>
              </div>
            </div>

            <div className="ingredients-div">
              <h3>Ingredients</h3>
              <div className="ingredients-text">
                {recipe && recipe.ingredients}
              </div>
            </div>
            <div className="instructions-div">
              <h3>Instructions</h3>
              <div className="instructions-text">
                {recipe && recipe.instructions}
              </div>
            </div>
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
              edit ? updateRecipe() : openForm();
            }}
          >
            {edit ? <div className="update-btn">Update </div> : <div>edit</div>}
          </button>

          <button className="delete" onClick={() => deleteRecipe()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Recipe;
