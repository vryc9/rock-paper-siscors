import {GameStatus, Message, RecordMap} from "../types/type.ts";

export interface Status {
    message: Message
}

export function determineMessageFromGameStatus(status: GameStatus): Message {
    const statusToMessageMap: RecordMap<GameStatus, Message> = {
        "WIN": "Vous avez gagné",
        "LOSE": "Vous avez perdu",
        "DRAW": "Il y a égalité"
    };

    return statusToMessageMap[status];
}