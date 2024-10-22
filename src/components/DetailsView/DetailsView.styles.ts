import styled from "styled-components";
import { Link } from  'react-router-dom';


const DetailsViewContainer = styled.div`
   text-align: center;
    padding: 0 50px;

   li {
    list-style: none;
   }
`;

const Category = styled.div`
    padding: 20px;
    background: #FFE300;
    color: black;
    font-weight: 700;
`;

const Button = styled(Link)`
    padding: 20px;
    font-weight: 900;
    border-radius: 20px;
    background: transparent;
    color: #FFE300;
    border: 2px solid #FFE300;
    margin-bottom: 30px;
    text-decoration: none;
`;

interface FavButtonProps {
    addedtofav?: boolean;
}

const FavButton = styled.button<FavButtonProps>`
    padding: 20px;
    font-weight: 900;
    border-radius: 20px;
    background: ${props => props.addedtofav ? "red" : "transparent"};
    color: #FFE300;
    border: 2px solid #FFE300;
    margin-bottom: 30px;
    text-decoration: none;
`;

export { DetailsViewContainer, Category, Button, FavButton };