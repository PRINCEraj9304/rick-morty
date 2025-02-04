


import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchData = async (text, page = 1) => {
    try {
        const response = await axios.get(`${API_URL}?name=${text}&page=${page}`);
        return response.data; // Return full response data
    } catch (error) {
        console.log("Error has occurred:", error);
        return null; // Return null on error
    }
};
