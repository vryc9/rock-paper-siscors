//GENERIC TYPES
export type RecordMap<K extends string | number | symbol, V> = {
    [P in K]: V;
};

//STATUS TYPES
export type GameStatus = "WIN" | "LOSE" | "DRAW";
export type Message = "Vous avez gagné" | "Vous avez perdu" | "Il y a égalité";

//CHOICE TYPES
export type ChoicesTypes = 'ROCK' | 'PAPER' | 'SCISSORS';
type Style = { className: string; icon: string }
export type ChoiceStyle = RecordMap<ChoicesTypes, Style>
