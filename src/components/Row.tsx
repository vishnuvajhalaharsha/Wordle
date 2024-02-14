import React, { useEffect } from "react";

interface ComponentProps {
  guess?: [];
  currentGuessWord?: string;
}
const Row: React.FC<ComponentProps> = ({ guess, currentGuessWord }) => {
  if (guess) {
    return (
      <div className="row after">
        {guess.map((l: any, i: number) => (
          <div key={i} className={l.color} style={{ backgroundColor: l.color }}>
            {l.letter}
          </div>
        ))}
      </div>
    );
  }
  if (currentGuessWord) {
    let guessingLetters = currentGuessWord.split("");

    return (
      <div className="row current">
        {guessingLetters.map((letter, i) => (
          <div key={i} className="filled" >
            {letter}
          </div>
        ))}
        {[...Array(5 - guessingLetters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
