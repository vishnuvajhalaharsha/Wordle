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
    reset,
    guessList,
  } = useWordleHook(originalWord, changeWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp as any);
    console.log(currentGuessWord);
   
    if (correct) {
      console.log("game over, guessed it right!!!");
      console.log(currentGuessWord);
    
      window.removeEventListener("keyup", handleKeyUp as any);
    }

    if (chances > 5) {
      console.log(currentGuessWord);
     
      window.removeEventListener("keyup", handleKeyUp as any);
    }
    if(reset){
        window.removeEventListener("keyup", handleKeyUp as any);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp as any);
    };
  }, [handleKeyUp, correct, chances, reset]);
  

  return (
    <div>
      {guessList.length > 5 && !guessList.includes(originalWord) && (
        <h2>Try again!!</h2>
      )}

      <Grid
        currentGuessWord={currentGuessWord}
        allGuessInfo={allGuessesInfo}
        chances={chances}
      />
      <h3>Total Won: {gameStats.won}</h3>
     
      <p>
        Actual Word: {originalWord} | Guess word :{currentGuessWord}
      </p>

      <button onClick={resetGame} > Reset</button>
      <button onClick={startGame}> Start Game</button>
    </div>
  );
};

export default Worlde;
