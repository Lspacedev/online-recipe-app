import React from "react";

class Recipecard extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div className="Recipecard">
       <div>{JSON.stringify(this.props.recipe)}</div>
        <button onClick={()=>this.props.handleDeleteRecipe(this.props.recipe.recipeName)}>delete</button>
      </div>
    );
  }
}

export default Recipecard;