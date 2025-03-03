import { choicesStyles, ChoicesTypes } from "../../Models/Choice";
import './Choices.css'

type Props = {
  onClick?: () => void;
  type: ChoicesTypes;
};

const Choices = ({ type, onClick }: Props) => {
  const { className, icon } = choicesStyles[type];

  return (
    <div className="choices-container">
      <div onClick={onClick} className={`game-button ${className}`}>
        <div className="inner-circle">
          <img src={icon} alt={type} />
        </div>
      </div>
    </div>
  );
};

export default Choices;
