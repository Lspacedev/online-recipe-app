import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

  }
  render(){
  return (
    <div className="Dashboard">
      <div className="recipes-number">
        <h5>Number of recipes</h5>
        <p>{this.props.currentUser.recipes.length}</p>
      </div>
      <div className="recipes-categories">
        <h5>Categories</h5>
        <p>3</p>
      </div>
    </div>
  )};
}

export default Dashboard;
