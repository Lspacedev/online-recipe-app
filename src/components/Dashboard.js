function Dashboard({ currentUser }) {
  return (
    <div>
      <div className="recipes-number">
        <h5>Number of recipes</h5>
        <p>{currentUser.recipes.length}</p>
      </div>
      <div className="recipes-number">
        <h5>Categories</h5>
        <p>3</p>
      </div>
    </div>
  );
}

export default Dashboard;
