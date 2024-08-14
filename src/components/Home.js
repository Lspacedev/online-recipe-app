import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Addrecipe from "./Addrecipe";
function Home({ handleAddRecipe, handleLogOut, handleSearchSubmit,handleSearchChange, searchInput }) {
  
  return (
    <div className="Home">
      <Sidebar handleLogOut={handleLogOut} />
      <div className="Main">
        <Header handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} searchInput={searchInput}/>
        <div className="cat-add">
          <Addrecipe handleAddRecipe={handleAddRecipe} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
