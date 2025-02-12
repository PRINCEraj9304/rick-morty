import { useEffect, useState } from "react";
import { fetchData } from "../services/Api";
import Character from "./Character";
import Shimmer from "./Shimmer";

const Characters = ({ text }) => {

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [text, currentPage]);

    const fetchCharacters = async (page) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchData(text, page);
            if (response && response.results) {
                setCharacters(response.results);
                setTotalPages(response.info.pages); // Set total pages dynamically
            } else {
                setCharacters([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again later.");
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Shimmer/>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="characters-container">
            {/* Display characters */}
            {characters.map((character) => (
                <div key={character.id} className="character-item">
                    <Character character={character} />
                </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || loading}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || loading}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Characters;
