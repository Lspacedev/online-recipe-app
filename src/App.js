import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home";

import DisplayRecipes from "./components/DisplayRecipes";
import Recipe from "./components/Recipe";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [submittedSearch, setsubmittedSearch] = useState("");

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

  function handleSearchSubmit(searchInput) {
    setsubmittedSearch(searchInput);
  }

  // function countCategories(categoryName) {
  //   if (JSON.stringify(currentUser) !== "{}") {
  //     let number = currentUser.recipes.reduce((count, recipe) => {
  //       if (recipe.category === categoryName) {
  //         count++;
  //       }
  //       return count;
  //     }, 0);
  //     return number;
  //   } else {
  //     return 0;
  //   }
  // }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home handleSearchSubmit={handleSearchSubmit} />}
          >
            {/* <Route
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
              /> */}
            <Route
              path="recipes"
              element={<DisplayRecipes submittedSearch={submittedSearch} />}
            >
              <Route path=":recipe_id" element={<Recipe />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
