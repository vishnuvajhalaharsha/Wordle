import React, { useState } from "react";
interface GuessWord {
  letter: string;
  color: string;
}

interface GameStats {
  won: number;
  lost: number;
  played: number;
  winStreak: number;
}

const useWordleHook = (solution: string, changeWord: () => void) => {
  const [allGuessesInfo, setAllGuessesInfo] = useState([...Array(6)]);
  const [currentGuessWord, setCurrentGuessWord] = useState<string>("");
  const [chances, setChances] = useState<number>(0);
  const [guessList, setGuessesList] = useState<string[]>([]);
  const [correct, setCorrectWord] = useState<boolean>(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    won: 0,
    lost: 0,
    played: 0,
    winStreak: 0,
  });
  const [reset, setReset] = useState(false);

  const maxLength = 5;

  const convertGuessWord = () => {
    let originalWord: string[] = [...solution]; // array

    let guessWord: GuessWord[] = [...currentGuessWord].map((guessLetter) => {
      return { letter: guessLetter, color: "#242424" };
    });

    guessWord.forEach((l, idx) => {
      if (originalWord[idx] === l.letter) {
        (guessWord[idx].color = "green"), (originalWord[idx] = "");
      }
    });
    guessWord.forEach((l, idx) => {
      if (originalWord.includes(l.letter) && l.color !== "green") {
        guessWord[idx].color = "orange";
        originalWord[originalWord.indexOf(l.letter)] = "";
      }
    });

    return guessWord;
  };

  const addToGuesses = (guessWordObj: GuessWord[]) => {
    if (currentGuessWord === solution) {
        setGameStats((prevObj) => {
            return {
              ...prevObj,
              won: prevObj.won + 1,
              played: prevObj.won + prevObj.lost + 1,
            };
          });
      setCorrectWord(true);
    

      console.log("you guessed the word!");

      return;
    }

    setAllGuessesInfo((prev) => {
      let newGuesses: any = [...prev];
      newGuesses[chances] = guessWordObj;
      return newGuesses;
    });
    setGuessesList((prevList) => {
      let updatedGuesses = [...prevList, currentGuessWord];
      return updatedGuesses;
    });

    setChances((prevChance) => {
      return prevChance + 1;
    });

    setCurrentGuessWord("");
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.key.toUpperCase();

    if (event.key === "Backspace") {
      setCurrentGuessWord((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (event.key === "Enter") {
      if (chances > 5) {
        console.log("your chances are over!!");
        return;
      }

      if (currentGuessWord.length !== 5) {
        console.log(allGuessesInfo, "allguess");
        console.log("too short");
        return;
      }
      let guessWordObj = convertGuessWord();
      addToGuesses(guessWordObj);
    }

    if (/^[A-Za-z]$/.test(inputValue)) {
      if (currentGuessWord.length < maxLength) {
        setCurrentGuessWord((prev) => {
          return prev + inputValue;
        });
      }
    }
  };

  const resetGame = () => {
    setReset(true);
    setCurrentGuessWord("");
    setAllGuessesInfo([...Array(6)]);
    setChances(0);
    setGuessesList([]);
    setCorrectWord(false);
    changeWord();
  };

  return {
    currentGuessWord,
    handleKeyUp,
    chances,
    allGuessesInfo,
    correct,
    guessList,
    resetGame,
    gameStats,
    reset,
    setGameStats,
  };
};

export default useWordleHook;
