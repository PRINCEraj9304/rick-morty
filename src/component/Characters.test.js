import { renderWithProviders } from "../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import Characters from "./Characters";
import * as characterSlice from "../slices/characterSlice";
import { setPage } from "../slices/characterSlice";
import { fireEvent } from "@testing-library/react";

// jest.mock("../slices/characterSlice", () => ({
//     ...jest.requireActual("../slices/characterSlice"),
//     setPage: jest.fn(),
// }));

describe("Characters Component", () => {

    it("renders Shimmer when loading is true", async () => {
        console.log = jest.fn(); // Mock console.log

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: [],
                        loading: true, // ✅ Ensure loading is true
                        currentPage: 1,
                        totalPages: 1,
                        error: null
                    }
                }
            }
        );

        // Ensure shimmer is in the document
        const Shimmer = screen.getByTestId("shimmer-container");
        expect(Shimmer).toBeInTheDocument();
    });

    it("renders 'No Characters Found...' when list is empty", async () => {
        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: [],
                        loading: false,
                        currentPage: 1,
                        totalPages: 1,
                        error: null,
                    },
                },
            }
        );

        const noCharactersElement = await screen.findByText("No Characters Found...");
        expect(noCharactersElement).toBeInTheDocument();
    });

    it("renders error message when error exists", async () => {
        const errorMessage = "Failed to load characters.";

        // Mock the fetchCharacters action
        jest.spyOn(characterSlice, 'fetchCharacters').mockImplementation(() => ({ type: 'TEST' }));

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: [],
                        loading: false,
                        currentPage: 1,
                        totalPages: 1,
                        error: errorMessage,
                    },
                },
            }
        );

        await waitFor(() => {
            const errorElement = screen.getByText(errorMessage);
            expect(errorElement).toBeInTheDocument();
            expect(errorElement).toHaveClass("error-message");
        });
    });

    it("renders character items when character list is available", () => {
        
        const mockCharacters = [
            { id: 1, name: "Rick Sanchez", species: "Human", status: "Alive", image: "rick-image-url" },
            { id: 2, name: "Morty Smith", species: "Human", status: "Alive", image: "morty-image-url" }
        ];

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: mockCharacters,
                        loading: false,
                        error: null,
                        currentPage: 1,
                        totalPages: 1
                    }
                }
            }
        );

        // Ensure character items render correctly
        const characterItems = screen.getAllByTestId("character-item");
        expect(characterItems).toHaveLength(mockCharacters.length);

        // Verify each character's name is displayed
        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    });

    it("disables 'Previous' button when on the first page", () => {
        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: mockCharacters,  // Add mock characters
                        loading: false,
                        error: null,
                        currentPage: 1,
                        totalPages: 5
                    }
                }
            }
        );

        const prevButton = screen.getByRole("button", { name: /prev/i });
        expect(prevButton).toBeDisabled();
    });

    it("enable prev button when we are not on first page", ()=>{
        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];
        renderWithProviders(<MemoryRouter><Characters/></MemoryRouter>,
            {
                preloadedState:{
                    characters:{
                        list : mockCharacters,
                        loading : false,
                        currentPage : 3,
                        totalPages : 5,
                        error : null,
                    },
                },
            },
        );

        const prevButton = screen.getByRole("button", { name: /prev/i });
        expect(prevButton).toBeEnabled();

    })

    if("whether prev button is dispatching correctly or not", ()=>{

        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];
        const setPageSpy = jest.spyOn(characterSlice, "setPage");

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: mockCharacters,
                        loading: false,
                        currentPage: 3,
                        totalPages: 5,
                        error: null,
                    },
                },
            }
        );

        const prevButton = screen.getByRole("button", { name: /prev/i });
        fireEvent.click(prevButton);
        
        expect(setPageSpy).toHaveBeenCalledWith(2);
    });


    it("disables 'next' button when on the last page", () => {
        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: mockCharacters,  // Add mock characters
                        loading: false,
                        error: null,
                        currentPage: 5,
                        totalPages: 5
                    }
                }
            }
        );

        const nextbutton = screen.getByRole("button", { name: /next/i });
        expect(nextbutton).toBeDisabled();
    });

    it("enable next button when we are not on last page", () => {
        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];
        const setPageSpy = jest.spyOn(characterSlice, "setPage");

        renderWithProviders(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>,
            {
                preloadedState: {
                    characters: {
                        list: mockCharacters,
                        loading: false,
                        currentPage: 2,
                        totalPages: 5,
                        error: null,
                    },
                },
            }
        );

        const nextButton = screen.getByRole("button", { name: /next/i });
        expect(nextButton).toBeEnabled();
    });

    it("cheking whether next button is dispatching correctly or not",()=>{
        const mockCharacters = [
            { id: 1, name: "Rick", species: "Human", status: "Alive", image: "url" }
        ];

        const setPageSpy = jest.spyOn(characterSlice, "setPage");

        renderWithProviders(<MemoryRouter><Characters/></MemoryRouter>,
            {
                preloadedState :{
                    characters :{
                        list :  mockCharacters,
                         loading : false,
                         currentPage: 2,
                         totalPages: 5,
                         error : null,
                    },
                },
            },
        );

        const nexbutton = screen.getByRole("button", { name : /next/i});
        fireEvent.click(nexbutton);
        expect(setPageSpy).toHaveBeenCalledWith(3);
    })

});
