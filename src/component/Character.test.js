import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"; // ✅ Added screen import
import Character from './Character';
import { renderWithProviders } from "../utils/test-utils";

describe('Character', () => {
    it("we are testing character-card is rendering or not", () => {
        const MockCharacter = {
            id: 1,
            name: "Rick Sanchez",
            species: "Human",
            status: "Alive",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        };

        renderWithProviders(
            <MemoryRouter>
                <Character character={MockCharacter} />
            </MemoryRouter>
        );

        const characterCard = screen.getByTestId('character-card');
        expect(characterCard).toBeInTheDocument();

        const characterImage = screen.getByTestId('character-image');
        expect(characterImage).toBeInTheDocument();

        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Human/i)).toBeInTheDocument();

        expect(characterImage).toHaveAttribute("src", MockCharacter.image);
    });

});