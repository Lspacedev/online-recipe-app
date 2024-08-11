import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Sidebar({handleLogOut, handleMain}) {
     //navigation
     const navigation = useNavigate();
     function handleNavigateRecipes() {
        navigation("/home/recipes");
      }
    return(
        <div className="Sidebar">

            <h3 className="logo">[Home]<span>Recipes</span></h3>
            <div className="sidebar-links">
                <div>Dashboard</div>
             
                    <div onClick={handleNavigateRecipes}>Recipes</div>
           
            </div>
            <div className="logout" onClick={handleLogOut}>Logout</div>
        </div>
    )
}

export default Sidebar;