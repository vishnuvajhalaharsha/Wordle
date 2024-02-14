import React, { useEffect } from "react";
import Row from "./Row";

interface ComponentProps {
  currentGuessWord: string;
  chances: number;
  allGuessInfo: any[];
}

const Grid: React.FC<ComponentProps> = ({
  allGuessInfo,
  chances,
  currentGuessWord,
}) => {
  return (
    <div>
      {allGuessInfo.map((guess, index) => {
        if (chances === index) {
          return <Row key={index} currentGuessWord={currentGuessWord} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
