import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Recipecard from "./Recipecard";

function DisplayRecipes({ submittedSearch }) {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { recipe_id } = useParams();
  const navigation = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRecipes();
  }, []);
  async function fetchRecipes() {
    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (submittedSearch.length > 0) {
      let filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().match(submittedSearch.toLowerCase()) ||
          recipe.category.toLowerCase().match(submittedSearch.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    }
    return () => {
      setSearchResults([]);
    };
  }, [submittedSearch]);
  function handleNavigateRecipe(id) {
    navigation(`/home/recipes/${id}`);
  }

  function getPicLink(obj) {
    if (true) {
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
      return obj.pic;
    }
  }

  return (
    <div className="DisplayRecipes">
      {recipe_id !== "" && typeof recipe_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="recipes-div">
          {searchResults && searchResults.length !== 0 ? (
            searchResults.map((recipe, i) => (
              <div className="item" key={i}>
                <Recipecard
                  recipe={recipe}
                  handleNavigateRecipe={handleNavigateRecipe}
                  pic={getPicLink(recipe)}
                  index={i}
                />
              </div>
            ))
          ) : recipes.length > 0 ? (
            recipes.map((recipe, i) => (
              <div className="item" key={i}>
                <Recipecard
                  recipe={recipe}
                  handleNavigateRecipe={handleNavigateRecipe}
                  pic={getPicLink(recipe)}
                />
              </div>
            ))
          ) : (
            <div>No recipes added</div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayRecipes;
