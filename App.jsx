import React, { useEffect, useState } from 'react';
import { fetchCharacters } from './api/gotApi';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (error) {
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
};

export default App;
