import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({handleSearchSubmit, handleSearchChange, searchInput}) {
  //navigation
  const navigation = useNavigate();
  function handleHamBurgerMenu() {
    const sidebar = document.querySelector(".Sidebar");
    sidebar.classList.toggle("active");
  }
  function handleNavigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="Header">
      <Searchbar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} searchInput={searchInput}/>
      <div className="ham-profile">
        <div className="hamburger-menu" onClick={handleHamBurgerMenu}>
          Ham
        </div>

        <div className="profile-link" onClick={handleNavigateProfile}>
          profile
        </div>
      </div>
    </div>
  );
}

export default Header;
