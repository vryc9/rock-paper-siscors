import {useContext, useEffect, useState} from "react";
import Choices from "../Choices/Choices";
import "./Pickup.css";
import {Context} from "../../hooks/useContextProvider";
import {ChoicesTypes, GameStatus, Message} from "../../types/type.ts"
import {determineMessageFromGameStatus, Status} from "../../Models/Status.ts";


const choices: ChoicesTypes[] = ["ROCK", "PAPER", "SCISSORS"];
const Pickup = () => {
        const [botSelectionLoading, setBotSelectionLoading] = useState(true);
        const context = useContext(Context);
        const [end, setEnd] = useState<boolean>(false);
        const [gameEndMessage, setGameEndMessage] = useState<Status | undefined>(undefined);

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

        const updatePlayerScore: () => void = (): void => {
            if (!player.choice || !bot.choice) {
                throw new Error("Player or bot choice is null");
            }
            if (isDraw()) {
                displayMessageFromStatus('DRAW');
            } else if (playerHasWon()) {
                setPlayer({...player, score: player.score + 1});
                displayMessageFromStatus('WIN')
            } else {
                setPlayer({...player, score: player.score - 1});
                displayMessageFromStatus("LOSE")
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

        const displayMessageFromStatus: (status: GameStatus) => void = (status: GameStatus): void => {
            const message: Message = determineMessageFromGameStatus(status);
            setGameEndMessage({message})
            setEnd(true)
        }

        const isDraw: () => boolean = (): boolean => {
            if (!player.choice || !bot.choice) {
                throw new Error("Player or bot choice is null");
            }
            return player.choice.type === bot.choice.type
        }

        const replay: () => void = (): void => {
            setEnd(false);
            setBotSelectionLoading(true);
        }


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

                {end && <div className="draw">
                    <p>{gameEndMessage!.message}</p>
                    <button onClick={replay}>Relancer</button>
                </div>}

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
