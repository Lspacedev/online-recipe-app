function Sidebar() {
    return(
        <div className="Sidebar">
            <h3 className="logo">[Home]<span>Recipes</span></h3>
            <div className="add-btn">Add</div>
            <div className="sidebar-links">
                <div>Dashboard</div>
                <div>Recipes</div>
            </div>
            <div className="logout">Logout</div>
        </div>
    )
}

export default Sidebar;