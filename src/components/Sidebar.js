import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { RiFileList3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

function Sidebar() {
  //navigation
  const navigation = useNavigate();
  function handleNavigateRecipes() {
    navigation("/home/recipes");
  }
  function handleNavigateHome() {
    navigation("/home");
  }
  function logOut() {
    localStorage.clear();
    navigation("/");
  }
  return (
    <div className="Sidebar">
      <h3 className="logo">
        <img src="/images/hat.png" />
        <br />
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

      <div className="logout" onClick={logOut}>
        <IoLogOut className="icon" />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
