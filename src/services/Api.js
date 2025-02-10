
/*
import axios from 'axios'

const API_URL = 'https://rickandmortyapi.com/api/character'

export const fetchData = async (text) =>{
    // exception handling
    try{
       return await axios.get(`${API_URL}?name=${text}`);
    }catch(error){
        console.log("error has occured", error);
    }
}
    */

// production site : https://67a1b9f6a019bb86ffce74d5--effervescent-concha-4cf990.netlify.app/


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
