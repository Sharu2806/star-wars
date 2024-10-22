import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavouriteView from "./FavouriteView";
import { FavListContext } from '../App/App';

describe("Favourites List Page", () => {

    test("Should render warning message if favourite character is not added", () => {
      const favListContextValue = {
        favList: [],
        addFavList: jest.fn(),
        removeFavList: jest.fn()
      };
      const renderComponent = () => render(
        <MemoryRouter>
          <FavListContext.Provider value={favListContextValue}>
            <FavouriteView />
          </FavListContext.Provider>
        </MemoryRouter>
      );
      renderComponent();
      expect(screen.getByText('No Character added to favourites')).toBeInTheDocument();
    });

    test("Should render list if favourite characters are added", () => {
      const favListContextValue = {
        favList: [{
          name: 'Joe Doe',
          gender: 'Male',
          Planet: 'Earth',
          },
          {
            name: 'Judy Doe',
            gender: 'Female',
            Planet: 'Earth',
          }],
        addFavList: jest.fn(),
        removeFavList: jest.fn()
      };
      const renderComponent = () => render(
        <MemoryRouter>
          <FavListContext.Provider value={favListContextValue}>
            <FavouriteView />
          </FavListContext.Provider>
        </MemoryRouter>
      );
      renderComponent();
      expect(screen.getAllByText('Delete').length).toBe(2);
    });
});  
