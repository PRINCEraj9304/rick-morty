import React from "react";
import Characters from "./Characters";
import { renderWithProviders } from "../utils/test-utils";
import { screen } from "@testing-library/react";

describe("we will test characters component", () => {
    let initialstate; // Declare globally

beforeEach(() => {
    initialstate = {  
        characters: {
            list: [],
            currentPage: 1,
            totalPages: 5,
            loading: false,
            error: null,
        },
        search: { text: "" },
    };

    console.log("BeforeEach - Initial Redux State:", initialstate); // 🔍 Debugging
});

    
    console.log("Test Redux State:", initialstate);


    it("renders 'No Characters Found' when list is empty", () => {
        renderWithProviders(<Characters />, { preloadedState: initialstate });

        expect(screen.getByText("No Characters Found...")).toBeInTheDocument();
    });

});
