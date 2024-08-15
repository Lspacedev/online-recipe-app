import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Recipecard from "./Recipecard";
import useLocalStorage from "./useLocalStorage";

function DisplayRecipes({ recipes, searchResults }) {
  const [recipeInfo, setRecipeInfo] = useLocalStorage("infoObj", {
    name: "",
    index: null,
  });

  const { recipe_name } = useParams();

  //navigation
  const navigation = useNavigate();

  //function to store clicked Recipecard information to use in navigating to Recipe subpage
  function handleNavigateRecipe(name, index) {
    setRecipeInfo({ name, index });
  }

  //useeffect to listen for click away from current Recipe subpage
  useEffect(() => {
    //check if click away true, recipe_name params undefined, if true clear local storage infoObj to avoid redirect to Recipe subpage
    if (typeof recipe_name === "undefined") {
      localStorage.removeItem("infoObj");
    } else {
      //in the case of change / update of Recipe name, update the recipeInfo Object, which will update the navigation url with new name in the second useeffect
      setRecipeInfo((prev) => ({ ...prev, name: recipe_name }));
    }
  }, [recipe_name]);

  //useeffect to listen to changes in recipeInfo, clicked Recipecard info, and navigate to clicked card subpage
  useEffect(() => {
    navigation(`/home/recipes/${recipeInfo.name}`);
  }, [recipeInfo]);

  function getPicLink(obj) {
    if (obj.pic === "") {
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
      {recipe_name !== "" && typeof recipe_name !== "undefined" ? (
        <Outlet context={{ recipeArr: recipes[recipeInfo.index] }} />
      ) : (
        <div className="recipes-div">
          {searchResults.length !== 0 ? (
            searchResults.map((recipe, i) => (
              <div className="item" key={i}>
                <Recipecard
                  recipe={recipe}
                  handleNavigateRecipe={handleNavigateRecipe}
                  recipeName={recipe.recipeName}
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
                  recipeName={recipe.recipeName}
                  pic={getPicLink(recipe)}
                  index={i}
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
