import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([
    {name: "guest", 
    surname: "guest",
    email: "guest@email.com",
    username: "guest",
    password: "guest",
    recipes: []}
  ]);
  const [currentUser, setCurrentUser] = useState(   {name: "guest", 
    surname: "guest",
    email: "guest@email.com",
    username: "guest",
    password: "guest",
    recipes: []});


  useEffect(() => {
    const usersCopy = users.slice(0);
    const foundUser = usersCopy.find(
      (user) => user.username === currentUser.username
    );
    if (foundUser) {
      foundUser.recipes = currentUser.recipes.slice(0);
    }

    setUsers(usersCopy);
  }, [currentUser]);

  function handleAddRecipe(obj) {
    //find recipe
    const filteredRecipe = currentUser.recipes.filter(
      (recipe) => recipe.recipeName === obj.recipeName
    );

    //if recipe doesn't exist add it
    if (filteredRecipe.length === 0) {
      setCurrentUser((prev) => ({ ...prev, recipes: [...prev.recipes, obj] }));
    }
  }

  function handleDeleteRecipe(name) {
    const filteredRecipes = currentUser.recipes.filter(
      (recipe) => (recipe) => recipe.recipeName !== name
    );
    setCurrentUser((prev) => ({ ...prev, recipes: filteredRecipes }));
  }

  function handleUpdateRecipe(name) {
    const recipesCopy = currentUser.recipes.slice(0);
    let recipe = recipesCopy.find((recipe) => recipe.recipeName === name);
    recipe.edit = true;

    setCurrentUser((prev) => ({ ...prev, recipes: recipesCopy }));
  }

  function handleRecipeResubmit(name, obj) {
    const recipesCopy= currentUser.recipes.slice(0);
    let recipe = recipesCopy.find((recipe) => recipe.recipeName === name);
    if (obj.recipeName) {
      recipe.recipeName = obj.recipeName;
    }
    if (obj.ingredients) {
      recipe.ingredients= obj.ingredients;
    }
    if (obj.instructions) {
      recipe.instructions = obj.instructions;
    }
    if (obj.category) {
      recipe.category = obj.category;
    }
    if (obj.prepTime) {
      recipe.prepTime = obj.prepTime;
    }
    if (obj.cookingTime) {
      recipe.cookingTime = obj.cookingTime;
    }
    if (obj.servings) {
      recipe.servings = obj.servings;
    }
 
  
  
    recipe.edit = false;

    setCurrentUser((prev) => ({ ...prev, recipes: recipesCopy }));
  }

  console.log("users",users, "current user", currentUser)
  return (
    <div className="App">
      <Sidebar/>
      <Main handleAddRecipe={handleAddRecipe}/>

    </div>
  );
}

export default App;
