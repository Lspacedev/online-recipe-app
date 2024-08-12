import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
        <ul>
          {recipes.map((recipe, i) => (
            <li key={i}>
              <div
                className="img"
                onClick={() => handleNavigateRecipe(recipe.recipeName, i)}
              >
                img
              </div>
              {JSON.stringify(recipe)}
              <button onClick={() => handleDeleteRecipe(recipe.recipeName)}>
                del
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayRecipes;
