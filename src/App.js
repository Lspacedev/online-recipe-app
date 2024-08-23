import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

import DisplayRecipes from "./components/DisplayRecipes";
import Recipe from "./components/Recipe";
import Dashboard from "./components/Dashboard";

import useLocalStorage from "./components/useLocalStorage";

import ProtectedRoutes from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bcrypt from "bcryptjs-react";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useLocalStorage("current", {});
  const [loginStatus, setLoginStatus] = useLocalStorage("loginStatus", false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [submittedSearch, setsubmittedSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);
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

  useEffect(() => {
    if (submittedSearch.length > 0) {
      let filteredRecipes = currentUser.recipes.filter(
        (recipe) =>
          recipe.recipeName
            .toLowerCase()
            .match(submittedSearch.toLowerCase()) ||
          recipe.category.toLowerCase().match(submittedSearch.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    }
    return () => {
      setSearchResults([]);
    };
  }, [submittedSearch]);

  /***  USER FUNCTIONS TO: REGISTER, LOGIN, LOGOUT, UPDATE DETAILS ****/

  async function handleRegistrationSubmit(obj) {
    //check if user exists
    const filteredUser = users.filter((user) => user.username === obj.username);
    if (filteredUser.length > 0) {
      alert("user already exists");
    } else if (obj.username === "" || obj.password === "") {
      alert("no user info");
    } else {
      alert("Account created.");
      const salt = await bcrypt.genSalt();
      obj.password = await bcrypt.hash(obj.password, salt);

      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(() => console.log("user added to database"));

      setUsers((prev) => [...prev, obj]);
      setRegistrationStatus(true);
    }
  }

  function handleLoginSubmit(obj) {
    const findUser = users.filter((user) => user.username === obj.username);
    if (findUser.length > 0) {
      let [user] = findUser;
      bcrypt.compare(obj.password, user.password).then((res) => {
        if (res === true) {
          setLoginStatus(true);

          setCurrentUser(user);
        } else {
          alert("invalid login password");
        }
      });
    } else {
      alert("user does not exist");
    }
  }

  async function handleUserUpdate(obj) {
    const userCopy = { ...currentUser };

    if (obj.name) {
      userCopy.name = obj.name;
    }

    if (obj.surname) {
      userCopy.surname = obj.surname;
    }

    if (obj.email) {
      userCopy.email = obj.email;
    }

    if (obj.username) {
      userCopy.username = obj.username;
    }

    if (obj.password) {
      userCopy.password = obj.password;
      const salt = await bcrypt.genSalt();
      userCopy.password = await bcrypt.hash(userCopy.password, salt);
    }

    if (obj.profilePic) {
      userCopy.profilePic = obj.profilePic;
    }

    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCopy),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "user information has been updated"));

    setCurrentUser(userCopy);
  }

  function handleDeleteAccount() {
    alert("You are about to delete your account. Continue?");
    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    //update database
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => console.log("User deleted"));
    //update state
    setUsers(filteredUsers);
    //logout
    setLoginStatus(false);
  }

  function handleLogOut() {
    const usersCopy = users.slice(0);
    const foundUser = usersCopy.find((user) => user.id === currentUser.id);

    if (foundUser) {
      foundUser.id = currentUser.id;
      foundUser.name = currentUser.name;
      foundUser.surname = currentUser.surname;
      foundUser.email = currentUser.email;

      foundUser.username = currentUser.username;
      foundUser.password = currentUser.password;
      foundUser.profilePic = currentUser.profilePic;
      foundUser.recipes = currentUser.recipes.slice(0);
      setUsers(usersCopy);
    }

    setLoginStatus(false);
  }

  /***  USER FUNCTIONS TO: ADD, DELETE, UPDATE RECIPES ****/

  function handleAddRecipe(obj) {
    //find recipe
    const filteredRecipe = currentUser.recipes.filter(
      (recipe) => recipe.recipeName === obj.recipeName
    );

    //if recipe doesn't exist add it
    if (filteredRecipe.length === 0) {
      let updatedUser = { ...currentUser };
      updatedUser.recipes = [...updatedUser.recipes, obj];

      //recipes array to update database
      let recipes = updatedUser.recipes;

      fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipes }),
      })
        .then((response) => response.json())
        .then((user) => console.log(user, "added recipe to database"));

      //update state
      setCurrentUser((prev) => ({ ...prev, recipes: [...prev.recipes, obj] }));
    }
  }

  function handleDeleteRecipe(name) {
    const filteredRecipes = currentUser.recipes.filter(
      (recipe) => recipe.recipeName !== name
    );

    let recipes = filteredRecipes;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipes }),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "recipe has been deleted"));

    //update state
    setCurrentUser((prev) => ({ ...prev, recipes: filteredRecipes }));
  }

  function handleUpdateRecipe(name) {
    const recipesCopy = currentUser.recipes.slice(0);
    let recipe = recipesCopy.find((recipe) => recipe.recipeName === name);
    recipe.edit = true;

    setCurrentUser((prev) => ({ ...prev, recipes: recipesCopy }));
  }

  function handleRecipeResubmit(name, obj) {
    const recipesCopy = currentUser.recipes.slice(0);
    let recipe = recipesCopy.find((recipe) => recipe.recipeName === name);
    //*****refactor to switch statement*****
    if (obj.recipeName) {
      recipe.recipeName = obj.recipeName;
    }
    if (obj.ingredients) {
      recipe.ingredients = obj.ingredients;
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
    if (obj.pic) {
      recipe.pic = obj.pic;
    }

    recipe.edit = false;
    //recipes array to update database
    let recipes = recipesCopy;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipes }),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "recipe has been updated"));

    //update state
    setCurrentUser((prev) => ({ ...prev, recipes: recipesCopy }));
  }

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

  function getProfilePic(obj) {
    if (obj.profilePic === "") {
      return "/images/avatar.png";
    } else {
      return obj.profilePic;
    }
  }
  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      setsubmittedSearch("");
    }
    setSearchInput(e.target.value);
  }
  function handleSearchSubmit() {
    setsubmittedSearch(searchInput);
  }

  function countCategories(categoryName) {
    if (JSON.stringify(currentUser) !== "{}") {
      let number = currentUser.recipes.reduce((count, recipe) => {
        if (recipe.category === categoryName) {
          count++;
        }
        return count;
      }, 0);
      return number;
    } else {
      return 0;
    }
  }

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
            <Route
              path="home"
              element={
                <Home
                  handleAddRecipe={handleAddRecipe}
                  handleLogOut={handleLogOut}
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchChange={handleSearchChange}
                  searchInput={searchInput}
                  profilePic={getProfilePic(currentUser)}
                />
              }
            >
              <Route
                index
                element={
                  <Dashboard
                    currentUser={currentUser}
                    breakfast={countCategories("breakfast")}
                    lunch={countCategories("lunch")}
                    dinner={countCategories("dinner")}
                    appetiser={countCategories("appetiser")}
                    main={countCategories("main")}
                    dessert={countCategories("dessert")}
                  />
                }
              />
              <Route
                path="recipes"
                element={
                  <DisplayRecipes
                    recipes={currentUser.recipes || []}
                    handleDeleteRecipe={handleDeleteRecipe}
                    searchResults={searchResults}
                  />
                }
              >
                <Route
                  path=":recipe_name"
                  element={
                    <Recipe
                      recipes={currentUser.recipes || []}
                      handleUpdateRecipe={handleUpdateRecipe}
                      handleRecipeResubmit={handleRecipeResubmit}
                      handleDeleteRecipe={handleDeleteRecipe}
                      getPicLink={getPicLink}
                    />
                  }
                />
              </Route>
              <Route
                path="profile"
                element={
                  <Profile
                    name={currentUser.name}
                    surname={currentUser.surname}
                    email={currentUser.email}
                    username={currentUser.username}
                    password={currentUser.password}
                    profilePic={getProfilePic(currentUser)}
                    handleUserUpdate={handleUserUpdate}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
