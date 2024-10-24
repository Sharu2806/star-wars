import React, { useState, createContext, useMemo } from "react";
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
  removeFavList: (value: string) => void;
}

export const FavListContext = createContext<FavListContextType>({
  favList: [],
  addFavList: () => {},
  removeFavList: (value) => {},
});

const App = () => {
  const [favList, setFavList] = useState<any[]>([]);
  const addFavList = (list: any) => setFavList(favList => [...favList, list]);
  const removeFavList = (value: any) => setFavList(prev => prev.filter(list => list.name !== value ));

  const contextValue = useMemo(() => ({ favList, addFavList, removeFavList }), [favList]);

  return (
      <BrowserRouter>
          <Nav/>
          <FavListContext.Provider value={contextValue}>
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
