import React from "react";
import styled from "styled-components";

const Logo = styled.img`
    width: 300px; 
    height: 150px;

    @media (max-width: 768px) {
        width: 200px; 
        height: 100px;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;


const Nav = () => (
    <Header><Logo src='/starwars.png' alt="star-wars-logo" /></Header>
    
)

export default Nav;