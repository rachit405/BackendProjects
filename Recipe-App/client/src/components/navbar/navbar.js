import "./navbar.css"
import { gql, useQuery } from "@apollo/client";
import React, { useState } from 'react';

function Navbar({setQuery,data}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle difficulty selection
    const HandleDifficultySelect = (selectedDifficulty) => {
        setQuery(
        gql` 
        query GetAllRecipies{
        findRecipiesById{
         id
         name 
        cookTimeMinutes
        difficulty
        image  
    }
  }
`
        )
        const { data } = useQuery(setQuery); 
    };
    return (
        <div className="navvvv">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Recipes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Difficulty
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={() => HandleDifficultySelect("all")}>All</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => HandleDifficultySelect("easy")}>Easy</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => HandleDifficultySelect("medium")}>Medium</a></li>

                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;