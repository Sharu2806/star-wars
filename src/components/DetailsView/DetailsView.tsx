import React, { useEffect, useState, useContext } from "react";
import { DetailsViewContainer, Category, Button, FavButton } from './DetailsView.styles';
import { ButtonContainer } from "../List/List.styles";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FavListContext } from '../App/App';

interface DetailsData {
    name?: string;
    height?: string;
    eye_color?: string;
    hair_color?: string;
    gender?: string;
    homeworld?: string;
    films?: []
}

const DetailsView = () => {
    let { state } = useLocation();
    const { favList, addFavList } = useContext(FavListContext);
    const [ isLoading, setLoading ] = useState(true);
    const [ detailsData, setDetailsData ] = useState<DetailsData>({});
    const [ films, setFilms ] = useState<any[]>([]);
    const [ starShips, setStarships ] = useState<any[]>([]);
    const [ planet, setHomePlanet ] = useState<String>('');
    const [ isAddedFav, setIsAddedToFav ] = useState(false);

    useEffect(() => {
        const fetchData = (url: string) => {
            axios.get(url)
            .then((response) => {
                const data = response?.data;
                if (Object.entries(data).length > 0) {
                    setDetailsData(data);
                }
                data?.films && data?.films.forEach((film: any) => {
                    fetchFilms(film);
                })
                data?.starships && data?.starships.forEach((starship: any) => {
                    fetchStarShips(starship);
                })
                data?.homeworld && fetchHomePlanet(data?.homeworld);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
        };

        isLoading &&state?.url && fetchData(state?.url);

        detailsData.name && favList.length > 0 && favList.forEach(list => {
            if (detailsData.name?.match(list.name)) {
                setIsAddedToFav(true);
            }
        })

    }, [state?.url, favList, detailsData, isLoading]);

    const fetchFilms = (url: any) => {
        return axios.get(url)
        .then((responce) => {
            setFilms(films => [...films, responce.data.title])
        });
    }

    const fetchStarShips = (url: any) => {
        return axios.get(url)
        .then((responce) => {
            setStarships(starShips => [...starShips, responce.data.name])
        });
    }

    const fetchHomePlanet = (url: any) => {
        return axios.get(url)
        .then((responce) => {
            setHomePlanet(responce.data.name);
        });
    }

    const renderElements = (elements: any[]) => {
       return elements.map((ele, index) => (
            <li key={`${index}|${ele}`}>{ele}</li>
        ));
    }

    const addToContext = () => {
        const favs = {
            name: detailsData?.name,
            gender: detailsData?.gender,
            homePlanet: planet
        }
        !isAddedFav && addFavList(favs);
    }

    if (Object.entries(detailsData) && Object.entries(detailsData).length <= 0) {
        return (
            <DetailsViewContainer> Something wrong with us</DetailsViewContainer>
        )
    }
    return (
        <>
                <DetailsViewContainer>
                    <ButtonContainer>
                        <Button to='/'>Back </Button>
                        <FavButton onClick={addToContext} addedtofav={!!isAddedFav}>Add to Favourite</FavButton>
                    </ButtonContainer>
                    
                    {Object.keys(detailsData)?.length > 0 && (
                    <>
                        <Category>Details</Category>
                        <p>Name : {detailsData?.name} </p>
                        <p>Height: {detailsData?.height} </p>
                        <p>Eye Colour: {detailsData?.eye_color} </p>
                        <p>Hair colour: {detailsData?.hair_color} </p>
                        <p>Gender: {detailsData?.gender}</p>
                    </>
                    )}
                     <p>Home planet: {planet}</p>
                    <Category>Films</Category>
                    <ul>
                        {renderElements(films)}
                    </ul>
                    <Category>Starships</Category>
                    <ul>
                        {renderElements(starShips)}
                    </ul>
                </DetailsViewContainer>
        </>
    );
}

export default DetailsView;