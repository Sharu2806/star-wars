import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavouriteView from "./FavouriteView";

describe("Favourites List Page", () => {

    test("Should render favourites List if added", async () => {
      
      const renderComponent = () => render(
        <MemoryRouter>
          <FavouriteView />
        </MemoryRouter>
      );
      renderComponent();
      
      expect(screen.getByAltText('spinner')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByAltText('spinner')).not.toBeInTheDocument();
      });
  
      await waitFor(() => {
        expect(screen.getAllByText('Show Details').length).toEqual(2);
      });
    });
});  