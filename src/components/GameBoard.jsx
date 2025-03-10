import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
import Card from "./card";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const data = await res.json();
      const formattedCards = data.results.map((pokemon, index) => ({
        id: index,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
      setCards(formattedCards);
    }
    fetchPokemon();
  }, []);
  const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const handleCardClick = (name) => {
    if (clickedCards.includes(name)) {
      setScore(0);
      setClickedCards([]);
    } else {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        setBestScore((prevBest) => Math.max(prevBest, newScore));
        return newScore;
      });
      setClickedCards([...clickedCards, name]);
    }
    setCards(shuffleCards([...cards]));
  };

  return (
    <>
      <div className="game-board">
        <Scoreboard score={score} bestScore={bestScore} />
        <div className="cards-container">
          {cards.map((card) => (
            <Card key={card.id} {...card} handleClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  );
}
export default GameBoard;
