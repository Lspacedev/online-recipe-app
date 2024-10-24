import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

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
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </div>

        <div onClick={handleNavigateRecipes}>
          <CiViewList />
          <p>Recipes</p>
        </div>
      </div>

      <div className="logout" onClick={handleLogOut}>
        <CiLogout />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
