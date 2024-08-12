import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Recipecard from "./Recipecard";

function DisplayRecipes({ recipes, handleDeleteRecipe }) {
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

  return (
    <div className="DisplayRecipes">
      {recipe_name !== "" && typeof recipe_name !== "undefined" ? (
        <Outlet context={{ recipeArr: recipes[recipeInfo.index] }} />
      ) : (
        <div className="recipes-div">
          {recipes.map((recipe, i) => (
            <div className="item" key={i}>
              <Recipecard
                recipe={recipe}
                handleNavigateRecipe={handleNavigateRecipe}
                recipeName={recipe.recipeName}
                index={i}
              />
              {/*<div
                className="img"
                onClick={() => handleNavigateRecipe(recipe.recipeName, i)}
              >
                img
              </div>
              {JSON.stringify(recipe)}
              <button onClick={() => handleDeleteRecipe(recipe.recipeName)}>
                del
              </button>*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayRecipes;
