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

import ProtectedRoutes from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [submittedSearch, setsubmittedSearch] = useState("");
  const [stats, setStats] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    appetiser: 0,
    main: 0,
    dessert: 0,
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) {
      fetchRecipes();
    }
  }, []);
  useEffect(() => {
    updateStats("breakfast");
    updateStats("lunch");
    updateStats("dinner");
    updateStats("appetiser");
    updateStats("main");
    updateStats("dessert");
  }, [recipes]);
  async function fetchRecipes() {
    try {
      const res = await fetch("http://localhost:3000/api/recipes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok === true) {
        const data = await res.json();

        setRecipes(data.recipes);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
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

  function handleSearchSubmit(searchInput) {
    setsubmittedSearch(searchInput);
  }

  function updateStats(categoryName) {
    let number = recipes.reduce((count, recipe) => {
      if (recipe.category === categoryName) {
        count++;
      }
      return count;
    }, 0);
    setStats((prev) => ({ ...prev, [categoryName]: number }));
  }
  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="register" element={<Registration />} />
          <Route exact path="login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="home"
              element={<Home handleSearchSubmit={handleSearchSubmit} />}
            >
              <Route
                index
                element={
                  <Dashboard
                    length={recipes.length}
                    breakfast={stats.breakfast}
                    lunch={stats.lunch}
                    dinner={stats.dinner}
                    appetiser={stats.appetiser}
                    main={stats.main}
                    dessert={stats.dessert}
                  />
                }
              />
              <Route
                path="recipes"
                element={
                  <DisplayRecipes
                    submittedSearch={submittedSearch}
                    updateStats={updateStats}
                  />
                }
              >
                <Route path=":recipe_id" element={<Recipe />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
