import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Character = ({ character }) => {
    const navigate = useNavigate();

    return (
        <div className="character-card" onClick={() => navigate(`/character/${character.id}`)}>
            <img className="character-image" src={character.image} alt={character.name} />
            <div className="character-info">
                <p className="character-name">Name: {character.name}</p>
                <p className="character-species">Species: {character.species}</p>
                <p className="character-status">
                    Status: <span className={character.status.toLowerCase()}>{character.status}</span>
                </p>
            </div>
        </div>
    );
};

export default Character;
