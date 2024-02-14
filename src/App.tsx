import  { useState } from "react";
import Worlde from "./components/Wordle";
import { useQuery } from "@tanstack/react-query";


function App() {
  const [wordIndex, setWordIndex] = useState<number>(Math.floor(Math.random() * 339));
  const { isLoading, error, data } = useQuery<string[]>({
    queryKey: ["words"],
    queryFn: () =>
      fetch("http://localhost:3000/api/fe/wordle-words").then((res) =>
        res.json()
      ),

  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred! </div>;

 const pickRandomWord = (): string => {
    if (data && wordIndex !== null) {
      return data[wordIndex];
    }
    return "";
  };

  const changeWord = (): void => {
    if (data && data.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * data.length);
      setWordIndex(randomIndex);
    }
  };

  return (
    <div>
      {data && (
        <Worlde originalWord={pickRandomWord()} changeWord={changeWord} />
      )}
    </div>
  );
}

export default App;
