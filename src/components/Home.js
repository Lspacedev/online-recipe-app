import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Addrecipe from "./Addrecipe";
function Home({ handleSearchSubmit }) {
  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        <Header handleSearchSubmit={handleSearchSubmit} />
        <div className="cat-add">
          <Addrecipe />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
