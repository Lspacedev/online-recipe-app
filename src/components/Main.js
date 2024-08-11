import Header from "./Header";
import Addrecipe from "./Addrecipe";


function Main({recipes, handleAddRecipe, handleDeleteRecipe}){
    return(
        <div className="Main">
            <Header/>
            <div className="cat-add">
                <Addrecipe handleAddRecipe={handleAddRecipe}/>
            </div>
 
        </div>
    )
}
export default Main