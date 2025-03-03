import { Choice } from "./Choice"

export interface Player {
    choice: Choice | undefined
    isComputer: boolean,
    score: number
}