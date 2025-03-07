import React from "react";

class Recipecard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Recipecard">
        <div
          className="img"
          onClick={() => this.props.handleNavigateRecipe(this.props.recipe._id)}
        >
          <img src={this.props.pic} alt="recipe" />

          <div className="cook-time">
            {this.props.recipe.cookingTime}minutes
          </div>
        </div>
        <div className="food-type">
          <h3>{this.props.recipe.name}</h3>
          <p>{this.props.recipe.category}</p>
        </div>
      </div>
    );
  }
}

export default Recipecard;
