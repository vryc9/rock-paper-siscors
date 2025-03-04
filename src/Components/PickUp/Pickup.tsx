import {useContext, useEffect, useState} from "react";
import Choices from "../Choices/Choices";
import "./Pickup.css";
import {Context} from "../../hooks/useContextProvider";
import {ChoicesTypes} from "../../Models/Choice";


const choices: ChoicesTypes[] = ["ROCK", "PAPER", "SCISSORS"];
const Pickup = () => {
        const [botSelectionLoading, setBotSelectionLoading] = useState(true);
        const context = useContext(Context);

        useEffect(() => {
            if (!context) {
                return;
            }
            if (botSelectionLoading) {
                botSelection();
            }
            if (!botSelectionLoading) {
                updatePlayerScore()
            }
        }, [botSelectionLoading]);

        if (!context) {
            console.error("Context is null in Pickup component");
            return null;
        }

        const {player, bot, setPlayer} = context;

        const updatePlayerScore = () => {
            console.log(bot, player)
            if (!player.choice || !bot.choice) {
                throw new Error("Player or bot choice is null");
            }
            if (playerHasWon()) {
                setPlayer({...player, score: player.score + 1});
            } else {
                setPlayer({...player, score: player.score - 1});
            }
        }

        const playerHasWon: () => boolean = (): boolean => {
            if (!player.choice || !bot.choice) {
                throw new Error("Player or bot choice is null");
            }
            return (
                (player.choice.type === "ROCK" && bot.choice.type === "SCISSORS") ||
                (player.choice.type === "SCISSORS" && bot.choice.type === "PAPER") ||
                (player.choice.type === "PAPER" && bot.choice.type === "ROCK"));
        }

        const botSelection: () => void = (): void => {
            setTimeout((): void => {
                const randomChoice = choices[Math.floor(Math.random() * choices.length)];
                bot.choice = {type: randomChoice};
                setBotSelectionLoading(false);
            }, 3000)
        };

        return (
            <div className="pickup-container">
                <div className="pick">
                    You picked
                    {player.choice ? (
                        <Choices type={player.choice.type}/>
                    ) : (
                        <div className="circle"></div>
                    )}
                </div>

                <div className="pick">
                    The house picked
                    {botSelectionLoading ? (
                        <div className="circle"></div>
                    ) : bot.choice ? (
                        <Choices type={bot.choice.type}/>
                    ) : (
                        <div className="circle"></div>
                    )}
                </div>
            </div>
        );
    }
;

export default Pickup;
