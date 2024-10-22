import styled from "styled-components";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

const ListDetails = styled.div`
  padding: 30px;
  margin: 30px;
  border-radius: 30px;
  background: #ffe300;
  height: auto;
  color: #000000;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 14rem;
  flex: 20rem 0 0;
`;

const LinkButton = styled(Link)`
  width: auto;
  border: none;
  border-radius: 10px;
  background: #000000;
  padding: 15px;
  color: #ffe300;
  text-decoration: none;
  &:hover {
    background: #3d3c30;
  }
`;

const FavListButton = styled(LinkButton)`
  border: 2px solid #ffe300;
  font-weight: 900;
  align-self: center;
  
`;

const Button = styled.button`
  padding: 20px;
  font-weight: 900;
  border-radius: 20px;
  background: black;
  color: #ffe300;
  border: 2px solid #ffe300;
  align-self: center;
  &:hover {
    background: #3d3c30;
  }
  &:disabled {
    color: #808080;
    cursor: no-drop;
    border: 2px solid #808080;
    &:hover {
      background: transparent;
    }
  }
`;

const ButtonContainer = styled.div`
  gap: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Spinner = styled.img`
  width: 400px;
  height: 300px;

  @media (max-width: 768px) {
    width: 200px;
    height: 100px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

const SearchText = styled.input`
    align-self: center;
    width: 200px;
    height: 40px;

`;

export {
  ListContainer,
  ListDetails,
  LinkButton,
  Button,
  ButtonContainer,
  FavListButton,
  Spinner,
  Container,
  SearchText,
};
