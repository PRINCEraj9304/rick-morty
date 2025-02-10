import { useEffect, useState } from "react";
import { fetchData } from "../services/Api";
import Character from "./Character";

const Characters = ({ text }) => {

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 8;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCharacters();
    }, [text]);

    const getAllCharacters = async () => {
        setLoading(true);  // Start loading
        setError(null);    // Reset previous error

        let allCharacters = [];
        let totalPages = 1;

        try {
            // First API call to get total pages
            const firstResponse = await fetchData(text);
            console.log("Full API Response:", firstResponse);

            if (firstResponse && firstResponse.info) {
                totalPages = firstResponse.info.pages; // Get total pages
                allCharacters = firstResponse.results; // Store first page results
            }

            // Loop through remaining pages
            for (let i = 2; i <= totalPages; i++) {
                const response = await fetchData(text, i); // Passing the page number
                if (response && response.results) {
                    allCharacters = [...allCharacters, ...response.results];
                }
            }

            setCurrentPage(1);  // Reset to first page after fetching
            setCharacters(allCharacters);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCharacters([]);
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);  // End loading
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const totalPages = Math.ceil(characters.length / dataPerPage);
    const displayedCharacters = characters.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage);

    return (
        <div className="characters-container">
            {/* Loading indicator
            {loading && <div className="loading">Loading...</div>} */}

            {/* Error message */}
            {/* {error && <div className="error">{error}</div>} */}

            {/* Display characters */}
            {!loading && !error && displayedCharacters.map((character) => (
                <div key={character.id} className="character-item">
                    <Character character={character} />
                </div>
            ))}

            {/* Pagination */}
            {!loading && !error && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Characters;
