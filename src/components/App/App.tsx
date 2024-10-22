import React, { useState, createContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import Home from '../List/List';
import DetailsView from '../DetailsView/DetailsView';
import FavouriteView from '../FavouriteView/FavouriteView';
import Nav from '../Nav/Nav';

interface FavListContextType {
  favList: any[];
  addFavList: (list: any) => void;
  removeFavList: (list: any) => void;
}

export const FavListContext = createContext<FavListContextType>({
  favList: [],
  addFavList: () => {},
  removeFavList: () => {},
});

const App = () => {
  const [favList, setFavList] = useState<any[]>([]);
  const addFavList = (list: any) => setFavList(favList => [...favList, list]);
  const removeFavList = (list: any) => setFavList(favList => [favList, ...list]);

  return (
    
      <BrowserRouter>
          <Nav/>
          <FavListContext.Provider value={{ favList, addFavList, removeFavList }}>
          <Routes>
              <Route path="/" Component={Home}/>
              <Route path="/details" Component={DetailsView}/>
              <Route path="/favourites" Component={FavouriteView}/>
          </Routes>
          </FavListContext.Provider>
      </BrowserRouter>
  )
};

export default App;