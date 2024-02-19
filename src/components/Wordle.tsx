import React, { useEffect } from "react";
import useWordleHook from "./hooks/useWordleHook";
import Grid from "./Grid";

interface ComponentProps {
  originalWord: string;
  changeWord: () => void;
}

const Worlde: React.FC<ComponentProps> = ({ originalWord, changeWord }) => {
  const {
    handleKeyUp,
    currentGuessWord,
    allGuessesInfo,
    chances,
    gameStats,
    correct,
    resetGame,
    startGame,
    setGameStats,
    reset,
    guessList,
  } = useWordleHook(originalWord, changeWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp as any);
   

    if (correct) {
      console.log("game over, guessed it right!!!");


      window.removeEventListener("keyup", handleKeyUp as any);
    }
  console.log(chances)
    if (chances > 5) {
        window.removeEventListener("keyup", handleKeyUp as any);
    }
    if (reset) {
      window.removeEventListener("keyup", handleKeyUp as any);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp as any);
    };
  }, [handleKeyUp, correct, chances, reset]);

  useEffect(()=>{
  if(guessList.length > 5 && !guessList.includes(originalWord)){
    setGameStats((prev)=>{
    return {...prev, lost : prev.lost + 1}
    })
  }
  },[guessList])

  return (
    <div>
      {correct && <h3>you guessed it right!!</h3>}
      {guessList.length > 5 && !guessList.includes(originalWord) && (
        <h2>Try again!!</h2>
      )}

      <Grid
        currentGuessWord={currentGuessWord}
        allGuessInfo={allGuessesInfo}
        chances={chances}
      />
      <h3>Total Won: {gameStats.won}</h3>
      <h3>Total Lost: {gameStats.lost}</h3>
      <h3>Total Played: {gameStats.won+ gameStats.lost}</h3>

      <p>
        Actual Word: {originalWord} | Guess word :{currentGuessWord}
      </p>

      <button onClick={resetGame}> Reset</button>
      <button onClick={startGame}> Start New Game</button>
    </div>
  );
};

export default Worlde;
