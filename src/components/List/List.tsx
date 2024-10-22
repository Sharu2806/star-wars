import React, { useEffect, useState, ChangeEvent } from "react";
import {
  ListContainer,
  LinkButton,
  ListDetails,
  Button,
  ButtonContainer,
  FavListButton,
  Spinner,
  Container,
  SearchText,
} from "./List.styles";
import axios from "axios";

const List = () => {
  const [listData, storeListData] = useState<any[]>([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [planet, setHomePlanet] = useState<String[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    isLoading && fetchData("https://swapi.dev/api/people");
  }, []);

  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((response) => {
        if (response && response?.data) {
          const data = response?.data?.results;
          if (data && Object.keys(data).length > 0) {
            storeListData(data);
            setNext(response?.data?.next);
            setPrevious(response?.data?.previous);
          }
          data &&
            data?.forEach((character: any) => {
              fetchHomePlanet(character?.homeworld);
            });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchHomePlanet = (url: any) => {
    return axios.get(url).then((responce) => {
      setHomePlanet((planet) => [...planet, responce.data.name]);
    });
  };

  const onClickOfNext = () => {
    next && fetchData(next);
  };

  const onClickOfPrevious = () => {
    previous && fetchData(previous);
  };

  const OnClickSearch = (e: ChangeEvent) => {
    setSearchText((e.target as HTMLInputElement).value);
    (!searchText || !(e.target as HTMLInputElement).value) && fetchData(`https://swapi.dev/api/people`);
  };

  const OnSearch = () => {
    searchText && fetchData(`https://swapi.dev/api/people/?search=${searchText}`);
  };

  if (!isLoading && listData && listData.length === 0) {
    return <ListContainer> Something wrong with us</ListContainer>;
  }
  return (
    <Container>
      {isLoading ? (
        <Spinner
          src="/spinner.svg"
          alt="spinner"
          width="400px"
          height="400px"
        />
      ) : (
        <>
          <ButtonContainer>
            <FavListButton to="/favourites">
              Go To Favourites List
            </FavListButton>
            <SearchText type="text" onChange={OnClickSearch}></SearchText>
            <Button onClick={OnSearch}>Search</Button>
          </ButtonContainer>

          <ListContainer>
            {!isLoading &&
              listData &&
              planet &&
              listData.map((item: any, index: number) => (
                <ListDetails key={`${index}${item.name}`}>
                  <p>
                    Name: {item.name} <br />
                    Gender: {item.gender} <br />
                  </p>
                  <LinkButton to={`/details`} state={{ url: item.url }}>
                    Show Details
                  </LinkButton>
                </ListDetails>
              ))}
          </ListContainer>
          <ButtonContainer>
            <Button onClick={onClickOfPrevious} disabled={!previous}>Previous</Button>
            <Button onClick={onClickOfNext} disabled={!next}>Next</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default List;
