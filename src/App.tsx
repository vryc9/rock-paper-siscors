import { JSX, useContext, useState } from "react";
import "./App.css";
import Score from "./Components/Score/Score";
import { Choice, ChoicesTypes } from "./Models/Choice";
import Choices from "./Components/Choices/Choices";
import Pickup from "./Components/PickUp/Pickup";
import { Context } from "./hooks/useContextProvider";

type StepMap = Record<number, JSX.Element>;

function App() {
  const choices: Choice[] = [
    { type: "ROCK", owner: undefined },
    { type: "PAPER", owner: undefined },
    { type: "SCISSORS", owner: undefined },
  ];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const context = useContext(Context);
  if (!context) return null;

  const { player, setPlayer } = context;

  const step: StepMap = {
    1: (
      <div className="choices">
        {choices.map(({ type }) => (
          <Choices key={type} type={type} onClick={() => handleClick(type)} />
        ))}
      </div>
    ),
    2: <Pickup />,
  };

  const handleClick = (type: ChoicesTypes) => {
    setPlayer({ ...player, choice: { type } });
    setCurrentStep(2);
  };

  return (
    <div className="app-container">
      <div className="content">
        <Score />
        {step[currentStep] || <p>Step non défini</p>}
      </div>
    </div>
  );
}

export default App;
