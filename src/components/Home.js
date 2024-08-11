import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";
import Main from './Main';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function Home({handleAddRecipe, handleLogOut}){
    const [mainPage, setMainPage] = useState(true);
    function handleMain (){
        setMainPage(true)
    }
    return (
        <div className='Home'>
            <Sidebar handleLogOut={handleLogOut}/>
            <Outlet/>
           
          
        </div>
    )
}

export default Home;