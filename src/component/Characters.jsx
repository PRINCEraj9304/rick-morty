

import { useEffect, useState } from "react";
import { fetchData } from "../services/Api";
import Character from "./Character";

const Characters = ({ text }) => {

    const [characters, setCharacters] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const dataperpage = 8;

    useEffect(() => {
        getAllCharacters();
    }, [text]);

    const getAllCharacters = async () => {
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
                const response = await fetchData(text, i); // we are also passing the page number
                if (response && response.results) {
                    allCharacters = [...allCharacters, ...response.results];
                }
            }
            setCurrentpage(1);
            setCharacters(allCharacters);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCharacters([]);
        }
    };

    const totalmanualpage = Math.ceil(characters.length / dataperpage);

    const displayedcharcater = characters.slice((currentpage-1)*dataperpage , currentpage*dataperpage);

    return (
        <div className="characters-container">
            {displayedcharcater.map((character) => (
                <div key={character.id} className="character-item">
                    <Character character={character} />
                </div>
            ))}

            {/* apgination */}
            <div className="pagination">
                <button onClick={()=>setCurrentpage(currentpage-1)} disabled = {currentpage === 1}>Prev</button>
                <span>Page {currentpage} of {totalmanualpage} </span>
                <button onClick={()=>setCurrentpage(currentpage+1)} disabled = {currentpage === totalmanualpage}>Next</button>
            </div>
        </div>
    );
};

export default Characters;
