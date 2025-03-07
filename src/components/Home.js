import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Addrecipe from "./Addrecipe";
import { useLocation } from "react-router-dom";

function Home({ handleSearchSubmit, totalPages, updatePage }) {
  const location = useLocation();
  let pages = new Array(totalPages + 1).fill(0);

  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        <Header handleSearchSubmit={handleSearchSubmit} />
        <div className="cat-add">
          {location.pathname !== "/home/profile" && <Addrecipe />}
        </div>
        <Outlet />
        {location.pathname === "/home/recipes" && (
          <div className="pagination">
            {pages.map((p, i) => (
              <div key={i} onClick={() => updatePage(i + 1)}>
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
