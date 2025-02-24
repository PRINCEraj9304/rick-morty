

import axios from "axios";
jest.mock("axios");

describe("API Testing", () => {
    it("should return mock data", async () => {
        // Mock API Response
        const mockData = {
            data: {
                results: [{ id: 1, name: "Rick Sanchez" }],
                info: { pages: 1 },
            },
        };

        axios.get.mockResolvedValue(mockData); 

        const response = await axios.get("https://rickandmortyapi.com/api/character");

        expect(response.status).toBeUndefined();
        expect(response.data.results).toHaveLength(1);
        expect(response.data.results[0].name).toBe("Rick Sanchez");
    });

    it("shoudl return empty when no charcter found " ,async()=>{
        
        const mockdata = {
            data : {
                results : [],
                info : {pages : 1},
            },
        };
        axios.get.mockResolvedValue(mockdata);
        const resp = await axios.get("https://rickandmortyapi.com/api/character");
        expect(resp.data.results).toHaveLength(0);

    })

    it("should call the api with correct parameter", async()=>{

        const searchtext = "Morty";
        const page = 2;
        await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${searchtext}`);
        expect(axios.get).toHaveBeenCalledWith(`https://rickandmortyapi.com/api/character?page=2&name=Morty`);

    })

    it("should return multiple character when more than 1 match has been found", async()=>{

        const multiplemockdata = {
            data : {
                results : [{id:1, name : "Rick Sanchez"},
                            {id : 2, name : "Morty Smith"},
                ],
                info : {pages : 1},
            },
        };

        axios.get.mockResolvedValue(multiplemockdata);
        const response = await axios.get("https://rickandmortyapi.com/api/character?name=Rick");
        expect(response.data.results).toHaveLength(2);
        expect(response.data.results[0].name).toBe("Rick Sanchez");
        expect(response.data.results[1].name).toBe("Morty Smith");
    })
});
