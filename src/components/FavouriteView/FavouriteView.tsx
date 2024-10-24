import React, { useContext, useEffect, useState } from "react";
import {
  DetailsViewContainer,
  Category,
} from "../DetailsView/DetailsView.styles";
import {
  Container,
  ListContainer,
  ListDetails,
  FavListButton,
  ButtonContainer,
  Button,
} from "../List/List.styles";
import { FavListContext } from "../App/App";
const FavouriteView = () => {
  const { favList, removeFavList } = useContext(FavListContext);
  const [listItems, setListItems] = useState<any[]>([]);

  useEffect(() => {
    setListItems(favList);
  }, []);

  const onDelete = (name: string) => {
    setListItems(listItems => listItems.filter(list =>
      list.name !== name
    ))
    
    removeFavList(name);
  }
  return (
    <Container>
      <DetailsViewContainer>
        <ButtonContainer>
          <FavListButton to="/">Back </FavListButton>
        </ButtonContainer>
        <p></p>
        <Category>Favourites</Category>
        {listItems.length <= 0 && <p>No Character added to favourites</p>}
        <ListContainer>
          {listItems.length > 0 &&
            listItems.map((list, index) => (
              <ListDetails key={`${index}${list.name}`}>
                <p>
                  Name: {list.name} <br />
                  Gender: {list.gender} <br />
                  Planet: {list.homePlanet}
                </p>
                <Button onClick={() => onDelete(list.name)}>Delete</Button>
              </ListDetails>
            ))}
        </ListContainer>
      </DetailsViewContainer>
    </Container>
  );
};

export default FavouriteView;
