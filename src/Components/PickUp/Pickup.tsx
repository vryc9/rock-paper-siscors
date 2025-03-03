import { useContext } from "react";
import Choices from "../Choices/Choices";
import "./Pickup.css";
import { Context } from "../../hooks/useContextProvider";
const Pickup = () => {
  const context = useContext(Context);
  if (!context) return null;
  const { player } = context;

  return (
    <div className="pickup-container">
      <div className="pick">
        You picked
        <Choices type={player.choice!.type} />
      </div>
    </div>
  );
};

export default Pickup;
