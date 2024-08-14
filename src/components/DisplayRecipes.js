import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Recipecard from "./Recipecard";

function DisplayRecipes({ recipes, handleDeleteRecipe, searchResults }) {
  const [showPage, setShowPage] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({ name: "", index: null });
  const [currentSubPage, setCurrentSubPage] = useState({});
  const { recipe_name } = useParams();

  //navigation
  const navigation = useNavigate();
  function handleNavigateRecipe(name, index) {
    setRecipeInfo({ name, index });
  }
  useEffect(() => {
    navigation(`/home/recipes/${recipeInfo.name}`);
    console.log(recipe_name, recipeInfo);
  }, [recipeInfo]);

  function getPicLink(obj) {
    if (obj.pic === "") {
      if (obj.category === "breakfast") {
        return "/images/breakfast.jpg";
      } else if (obj.category === "lunch") {
        return "/images/lunch.jpg";
      } else if (obj.category === "dinner") {
        return "/images/dinner.jpg";
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
          {searchResults.length !== 0
          ?
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
          : (recipes.length > 0?
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
          )):(<div>No recipes added</div>)
        )}
        </div>
      )}
    </div>
  );
}

export default DisplayRecipes;
