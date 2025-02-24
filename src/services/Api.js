

// production site : https://67a1b9f6a019bb86ffce74d5--effervescent-concha-4cf990.netlify.app/


import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchData = async (text, page) => {

    console.log("fetcjing api with text", text, " and page is", page);
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${text}`);
        const data = await response.json();
        console.log("api data",data);
        return data || { results: [], info: { pages: 1 } }; // ✅ Prevents `null`
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { results: [], info: { pages: 1 } }; // ✅ Safe fallback
    }
};


