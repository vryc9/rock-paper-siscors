import rock from "../assets/images/icon-rock.svg";
import paper from "../assets/images/icon-paper.svg";
import scissors from "../assets/images/icon-scissors.svg";


type Style = { className: string; icon: string }
type ChoiceStyle = Record<ChoicesTypes, Style>

export interface Choice {
    type: ChoicesTypes
}

export const choicesStyles: ChoiceStyle = {
    ROCK: { className: "rock", icon: rock },
    PAPER: { className: "paper", icon: paper },
    SCISSORS: { className: "scissors", icon: scissors },
};

export type ChoicesTypes = 'ROCK' | 'PAPER' | 'SCISSORS';
