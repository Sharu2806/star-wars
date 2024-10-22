import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "./List";
import axios from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Character List Page", () => {

  test("Should render Character List properly", async () => {
    jest.resetAllMocks();
    (mockedAxios.get as jest.Mock).mockResolvedValue({
      data: {
        count: 2,
        next: null,
        previous: null,
        results: [
          {
          name: 'Joe Doe',
          gender: 'Male',
          },
          {
            name: 'Jane Doe',
            gender: 'Female',
          }
        ]
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const renderComponent = () => (render(<MemoryRouter><List /></MemoryRouter>));
    renderComponent();
    
    expect(screen.getByAltText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByAltText('spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByText('Show Details').length).toEqual(2);
    });
  });

  test("Should render error message when no data returned", async () => {
    jest.resetAllMocks();
    (mockedAxios.get as jest.Mock).mockResolvedValue({
      data : {},
      status: 500,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    
    const renderComponent = () => (render(<MemoryRouter><List /></MemoryRouter>));
    renderComponent();
    
    expect(screen.getByAltText('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('Something wrong with us').length).toBeTruthy();
    });
  });

  test("Should show spinner when api error", async () => {
    jest.resetAllMocks();
    (mockedAxios.get as jest.Mock).mockRejectedValue(new Error('errorMessage'));
    
    const renderComponent = () => (render(<MemoryRouter><List /></MemoryRouter>));
    renderComponent();
    
    expect(screen.getByAltText('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByAltText('spinner')).toBeInTheDocument();
    });
  });
});
