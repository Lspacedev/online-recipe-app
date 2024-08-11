import './App.css';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from "./components/Login";
import Landing from './components/Landing';
import Profile from './components/Profile';

import DisplayRecipes from './components/DisplayRecipes';
import Recipe from './components/Recipe';

import ProtectedRoutes from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(false);
  
  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then((res)=>res.json())
    .then((res)=>{
      setUsers(res);
    }
    );
   


  },[])
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

  function handleRegistrationSubmit(obj) {
    //check if user exists
    const filteredUser = users.filter((user) => user.username === obj.username);
    if (filteredUser.length > 0) {
      alert("user already exists");
    } else if (obj.username === "" || obj.password === "") {
      alert("no user info");
    } else {
      alert("Account created.");
   
      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',       
        },
        body: JSON.stringify(obj), 
      }).then(()=>console.log("user added"));
  










      setUsers((prev) => [...prev, obj]);
      setRegistrationStatus(true);
    }
  }

  function handleLoginSubmit(obj) {
    const findUser = users.filter((user) => user.username === obj.username);
    if (findUser.length > 0) {
      let [user] = findUser;
      if (user.password === obj.password) {
        setLoginStatus(true);
        setCurrentUser(user);
      } else {
        alert("invalid login password");
      }
    } else {
      alert("user does not exist");
    }
  }

  function handleUserUpdate(obj) {
    const userCopy = { ...currentUser };

    if (obj.username) {
      userCopy.username = obj.username;
    }

    if (obj.password) {
      userCopy.password = obj.password;
    }

    setCurrentUser(userCopy);
  }

  function handleLogOut() {
   /* const usersCopy = users.slice(0);
    const foundUser = usersCopy.find((user) => user.id === currentUser.id);
    console.log(currentTemp, foundUser, currentUser);

    if (foundUser) {
      foundUser.id = currentUser.id;
      foundUser.username = currentUser.username;
      foundUser.password = currentUser.password;
      foundUser.tasks = currentUser.tasks.slice(0);
      //usersCopy = usersCopy.filter(user);
      setUsers(usersCopy);
    }

    console.log("new", usersCopy);*/

    setLoginStatus(false);
  }

  function handleAddRecipe(obj) {
    //find recipe
    const filteredRecipe = currentUser.recipes.filter(
      (recipe) => recipe.recipeName === obj.recipeName
    );

    //if recipe doesn't exist add it
    if (filteredRecipe.length === 0) {
      let updatedUser =  {...currentUser};
      updatedUser.recipes = [...updatedUser.recipes, obj];
      let recipes = updatedUser.recipes;

  
      fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipes}),
      })
      .then(response => response.json())
      .then(user => console.log(user, "uppdadad"));
  

      setCurrentUser((prev) => ({ ...prev, recipes: [...prev.recipes, obj] }));
    }
  }

  function handleDeleteRecipe(name) {
    const filteredRecipes = currentUser.recipes.filter(
     (recipe) => recipe.recipeName !== name
    );
    
    let recipes = filteredRecipes;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({recipes}),
    })
    .then(response => response.json())
    .then(user => console.log(user, "uppdadad2"));

    
    setCurrentUser((prev) => ({ ...prev, recipes: filteredRecipes }));
  }

  function handleUpdateRecipe(name) {
    console.log("ufdfcilckece")
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


    let recipes = recipesCopy;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({recipes}),
    })
    .then(response => response.json())
    .then(user => console.log(user, "uppdadad3"));


    setCurrentUser((prev) => ({ ...prev, recipes: recipesCopy }));
  }

  console.log("users",users, "current user", currentUser)
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="registration"
            element={
              <Registration
                count={users.length}
                handleRegistrationSubmit={handleRegistrationSubmit}
                registrationStatus={registrationStatus}
              />
            }
          />
          <Route
            exact
            path="login"
            element={
              <Login
                handleLoginSubmit={handleLoginSubmit}
                loginStatus={loginStatus}
              />
            }
          />

          <Route element={<ProtectedRoutes loginStatus={loginStatus} />}>
      
            <Route path="home" element={ <Home handleAddRecipe={handleAddRecipe} handleLogOut={handleLogOut}/>}>
           
                <Route
                  path='recipes'
                  element={
                    <DisplayRecipes recipes={currentUser.recipes || []} handleDeleteRecipe={handleDeleteRecipe}/>
                  }
                >
                  <Route
                    path=":recipe_name"
                    element={
                    <Recipe  recipes={currentUser.recipes || []} handleUpdateRecipe={handleUpdateRecipe} handleRecipeResubmit={handleRecipeResubmit} handleDeleteRecipe={handleDeleteRecipe}/>}/>
                </Route>
              <Route
                path="profile"
                element={
                  <Profile
                    username={currentUser.username}
                    password={currentUser.password}
                    handleUserUpdate={handleUserUpdate}
                  />
                }
              />

            
            </Route>
                          

          </Route>
        </Routes>
      </div>
    </Router>
   
  )
}

export default App;
