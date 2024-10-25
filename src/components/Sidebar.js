import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { RiFileList3Fill } from "react-icons/ri";

import { IoLogOut } from "react-icons/io5";

function Sidebar({ handleLogOut }) {
  //navigation
  const navigation = useNavigate();
  function handleNavigateRecipes() {
    navigation("/recipes");
  }
  function handleNavigateHome() {
    navigation("/");
  }
  return (
    <div className="Sidebar">
      <h3 className="logo">
        Home<span>Recipes</span>
      </h3>
      <div className="sidebar-links">
        <div onClick={handleNavigateHome}>
          <RiDashboardFill className="icon" />
          <p>Dashboard</p>
        </div>

        <div onClick={handleNavigateRecipes}>
          <RiFileList3Fill className="icon" />
          <p>Recipes</p>
        </div>
      </div>

      <div className="logout" onClick={handleLogOut}>
        <IoLogOut className="icon" />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
