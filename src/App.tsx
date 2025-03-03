import { useState } from "react";
import "./App.css";
import Score from "./Components/Score/Score";
import { Choice } from "./Models/Choice";
import Choices from "./Components/Choices/Choices";

function App() {
  const [choices, setChoices] = useState<Choice[]>([
    {
      type: "ROCK",
      owner: undefined,
    },
    {
      type: "PAPER",
      owner: undefined,
    },
    {
      type: "SCISSORS",
      owner: undefined,
    },
  ]);

  const handleClick = () => {
    setChoices([...choices]);
  };

  return (
    <div className="app-container">
      <div className="content">
        <Score />
        {choices.map((choice) => (
          <Choices key={choice.type} type={choice.type} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
