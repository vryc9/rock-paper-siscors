import { useContext, useEffect, useState, useCallback, useRef } from "react";
import Choices from "../Choices/Choices";
import "./Pickup.css";
import { Context } from "../../hooks/useContextProvider";
import { ChoicesTypes } from "../../Models/Choice";

// Définition des choix en dehors du composant
const choices: ChoicesTypes[] = ["ROCK", "PAPER", "SCISSORS"];

const Pickup = () => {
  // Tous les hooks doivent être appelés au début
  const [botSelectionLoading, setBotSelectionLoading] = useState(true);
  const resultProcessed = useRef(false); // Utiliser useRef pour suivre si le résultat a été traité
  const context = useContext(Context);

  // Fonction pour déterminer le gagnant
  const determineWinner = useCallback(() => {
    if (!context) return;
    
    const { player, bot, setPlayer } = context;
    
    // Vérifier si les choix existent
    if (!player.choice || !bot.choice) {
      return;
    }

    // Utiliser useRef pour éviter les traitements multiples
    if (resultProcessed.current) {
      return;
    }

    console.log("Détermination du gagnant...");

    if (player.choice.type === bot.choice.type) {
      console.log("Égalité!");
    } else if (
      (player.choice.type === "ROCK" && bot.choice.type === "SCISSORS") ||
      (player.choice.type === "SCISSORS" && bot.choice.type === "PAPER") ||
      (player.choice.type === "PAPER" && bot.choice.type === "ROCK")
    ) {
      console.log("Vous gagnez!");
      setPlayer({ ...player, score: player.score + 1 });
    } else {
      console.log("Vous perdez!");
      setPlayer({ ...player, score: player.score - 1 });
    }

    // Marquer le résultat comme traité
    resultProcessed.current = true;
  }, [context]);

  // Effet pour sélectionner le choix du bot
  useEffect(() => {
    if (!context) return;
    
    const { bot, setBot } = context;
    
    // Réinitialiser l'état de traitement du résultat
    resultProcessed.current = false;
    
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const randomChoice = choices[randomIndex];

      setBot({
        ...bot,
        choice: { type: randomChoice },
      });

      setBotSelectionLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [context]);

  // Effet pour déterminer le gagnant une fois les choix faits
  useEffect(() => {
    if (!context) return;
    
    const { player, bot } = context;
    
    if (player.choice && bot.choice && !botSelectionLoading) {
      determineWinner();
    }
  }, [context, botSelectionLoading, determineWinner]);

  // Early return après tous les hooks si le contexte est nul
  if (!context) {
    console.error("Context is null in Pickup component");
    return null;
  }

  const { player, bot } = context;

  return (
    <div className="pickup-container">
      <div className="pick">
        You picked
        {player.choice ? (
          <Choices type={player.choice.type} />
        ) : (
          <div className="circle"></div>
        )}
      </div>

      <div className="pick">
        The house picked
        {botSelectionLoading ? (
          <div className="circle"></div>
        ) : bot.choice ? (
          <Choices type={bot.choice.type} />
        ) : (
          <div className="circle"></div>
        )}
      </div>
    </div>
  );
};

export default Pickup;