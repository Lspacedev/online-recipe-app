function Header(){
    function handleHamBurgerMenu(){
        const sidebar = document.querySelector(".Sidebar");
        sidebar.classList.toggle("active");
    }
    return (
        <div className="Header">
            <div className="hamburger-menu" onClick={handleHamBurgerMenu}>Ham</div>
        </div>
    )
}

export default Header;