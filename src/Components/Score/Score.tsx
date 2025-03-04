import "./Score.css";
import logo from "../../assets/images/logo.svg";
const Score = ({ score }: { score: number }) => {
  return (
    <div className="score-container">
      <div className="score-wrapper">
        <div className="logo">
          <img height={80} width={120} src={logo} alt="logo" />
        </div>
        <div className="score">
          <p>Score</p>
          <strong>{score}</strong>
        </div>
      </div>
    </div>
  );
};

export default Score;
