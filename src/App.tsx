import { useState } from "react";
import Worlde from "./components/Wordle";
import { useQuery } from "@tanstack/react-query";
import { MockData } from "./fallback-data/mock.js";

function App() {
  const [wordIndex, setWordIndex] = useState<number>(
    Math.floor(Math.random() * 339)
  );
  const { isLoading, error, data } = useQuery<string[]>({
    queryKey: ["words"],
    queryFn: () =>
      fetch("http://localhost:3000/api/fe/wordle-words").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <> Loading</>;
  }

  const pickRandomWord = (): string => {
    if (data && wordIndex !== null) {
      return data[wordIndex];
    } else if (MockData && wordIndex !== null) {
      return MockData[wordIndex];
    }
    return "";
  };

  const changeWord = (): void => {
    if (data && data.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * data.length);

      setWordIndex(randomIndex);
    }
    if (MockData && MockData.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * MockData.length);
      setWordIndex(randomIndex);
    }
  };

  if (error)
    return (
      <div>
        {" "}
        <Worlde originalWord={pickRandomWord()} changeWord={changeWord} />{" "}
      </div>
    );

  return (
    <div>
      <Worlde originalWord={pickRandomWord()} changeWord={changeWord} />
    </div>
  );
}

export default App;
