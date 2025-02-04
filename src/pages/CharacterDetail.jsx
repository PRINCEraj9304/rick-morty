import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterDetail = () => {

    const { id } = useParams();  // Get ID from URL
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
            } catch (error) {
                setError("Character not found!");
            } finally {
                setLoading(false);
            }
        };
        getCharacter();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="character-detail-container">
            <img className="character-detail-image" src={character.image} alt={character.name} />
            <h1 style={{color :"#F2EFE7", fontSize: "34px"}}>{character.name}</h1>
            <p style={{color :"#F2EFE7", fontSize: "20px"}} ><strong>Species :</strong> {character.species}</p>
            <p style={{color :"#F2EFE7", fontSize: "20px"}} ><strong>Status :</strong> {character.status}</p>
            <p style={{color :"#F2EFE7", fontSize: "20px"}} ><strong>Gender :</strong> {character.gender}</p>
            <p style={{color :"#F2EFE7", fontSize: "20px"}}><strong>Origin :</strong> {character.origin.name}</p>
            <p style={{color :"#F2EFE7", fontSize: "20px"}}><strong>Location :</strong> {character.location.name}</p>
            <p style={{color :"#F2EFE7", fontSize: "20px"}}><strong>Total Episode Appearance :</strong> {character.episode.length}</p>
        </div>
    );
};

export default CharacterDetail;
