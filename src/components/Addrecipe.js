import Form from "./Form";
import { useState } from "react";
function Addrecipe({ handleAddRecipe }) {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }
  return (
    <div className="Addrecipe">
      <div className="Add-div">
        {clicked && (
          <Form
            handleAddRecipe={handleAddRecipe}
            toggleClicked={toggleClicked}
          />
        )}

        <button onClick={toggleClicked}>
          <p id="add-btn-short">+</p>
          <p id="add-btn-long-text">New Recipe</p>
        </button>
      </div>
    </div>
  );
}

export default Addrecipe;
