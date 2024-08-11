import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";
import Main from './Main';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Header from "./Header";
import Addrecipe from "./Addrecipe";
function Home({handleAddRecipe, handleLogOut}){
    const [mainPage, setMainPage] = useState(true);
    function handleMain (){
        setMainPage(true)
    }
    return (
        <div className='Home'>
            <Sidebar handleLogOut={handleLogOut}/>
            <div className="Main">
                <Header/>
                <div className="cat-add">
                    <Addrecipe handleAddRecipe={handleAddRecipe}/>
                </div>
                <Outlet/>
            </div>
           
          
        </div>
    )
}

export default Home;