import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/gotApi';

export default function GenerateCharacters() {

const [characters, setCharacters] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();

        // Add "selected: false" to each character
        const updatedCharacters = data.map((character) => ({
            ...character,
            selected: false,
          }));

         setCharacters(updatedCharacters);
        
      } catch (error) {g
        console.error('Failed to load characters:', error);
      } finally {
        setLoading(false);
      }
    };
 
    getCharacters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(characters.map((character) => (character.selected)));
  console.log(characters);
  
  return (
    <div className="App">
      <h1>Game of Thrones Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.imageUrl} alt={character.fullName} width="50" />
            <p>{character.fullName}</p>
          </li>
        ))}
      </ul>
    </div>
  );

}