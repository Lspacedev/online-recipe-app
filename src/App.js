import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
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
  return (
    <div className="App">
      <Sidebar/>
      <Main handleAddRecipe={handleAddRecipe}/>

    </div>
  );
}

export default App;
