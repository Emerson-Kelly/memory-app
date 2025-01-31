import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../api/gotApi";

export default function GenerateCharacters() {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const shuffleAndSetCharacters = (allCharacters) => {
    let shuffled = allCharacters
      .sort(() => Math.random() - 0.5) // Shuffle characters
      .slice(0, 10); // Take 10 random characters

    // Prioritize selected ones (if available)
    let selectedList = shuffled.filter((char) => char.selected);
    console.log(selectedList);

    if (selectedList.length < Math.min(score, 9)) {
      let extraSelected = allCharacters
        .filter((char) => char.selected && !shuffled.includes(char))
        .slice(0, Math.min(score, 9) - selectedList.length);
      shuffled = [...shuffled, ...extraSelected].slice(0, 10);
      console.log(extraSelected);
    }

    setDisplayedCharacters(shuffled);
  };

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
        shuffleAndSetCharacters(updatedCharacters, []);
      } catch (error) {
        console.error("Failed to load characters:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  //console.log(characters.map((character) => (character.selected)));
  //console.log(characters);

  

  const handleCardClick = (clickedCharacter) => {
    // Add a true selected value to the clicked on GOT character card
    

    setCharacters((previousCharacters) => {
      return previousCharacters.map((char) =>
        char.id === clickedCharacter.id ? { ...char, selected: true } : char
      );
    });

    clickedCharacter.selected === true;
    //console.log(clickedCharacter);

    if (!clickedCharacter.selected) {
      // Increment the users score by 1

      setScore((prevCount) => prevCount + 1);
    
      console.log(clickedCharacter);
    } else {
      setScore(0);
      setBestScore((prevBest) => Math.max(prevBest, score + 1));

      console.log("you lost");
      // Reset all selected values of GOT characters to false
      setCharacters((prev) => prev.map((char) => ({ ...char, selected: false })));
    }

    shuffleAndSetCharacters(characters);
    console.log(score);
    console.log(characters);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Game of Thrones Memory Game</h1>
      <p>Score: {score} || Best Score: {bestScore}</p>
      <ul>
        {displayedCharacters.map((character) => (
          <div
            key={character.id}
            onClick={() => handleCardClick(character)}
            className="character-card"
          >
            <img src={character.imageUrl} alt={character.fullName} width="50" />
            <p>{character.fullName}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
