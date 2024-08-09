import Searchbar from "./Searchbar";

function Header(){
    function handleHamBurgerMenu(){
        const sidebar = document.querySelector(".Sidebar");
        sidebar.classList.toggle("active");
    }
    return (
        <div className="Header">
            <Searchbar/>
            <div className="ham-profile">
                <div className="hamburger-menu" onClick={handleHamBurgerMenu}>Ham</div>

                <div className="profile-link">profile</div>
            </div>
        </div>
    )
}

export default Header;