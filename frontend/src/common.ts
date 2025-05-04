import { Dispatch, SetStateAction } from "react";

/******************************************************************************
 * Common Types
 ******************************************************************************
 */

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type GenericDict<T> = {[key: string]: T};

/******************************************************************************
 * Common Interfaces
 ******************************************************************************
 */

export interface XYPos {
    x: number;
    y: number;
}

export interface GameData {
    gameUID: string;          // Internal unique game identifier
    displayName: string;      // The name of the game
    gamePath: string;         // The local path of the game files
    coverImagePath?: string;  // Path to the cover image (if provided)
    dateAdded: Date;          // Date uploaded to the tool
    releaseDate?: Date;       // Date the game was released
    version?: string;         // Version of the game
    genre?: string;           // Main genre of the game, subgenres should be in tags
    description?: string;     // Game description
    developer?: string;       // Name of developer of the game
    tags?: string[];          // NSFW, SFW, 3D, 2D, and other game identifiers (see itch.io for game tag examples)
    collections?: string[];   // Favorites, custom collections
}
export type GameDataProp = keyof GameData;

/******************************************************************************
 * Common Data
 ******************************************************************************
 */

const DEFAULT_SERVER_PORT: string = "8000";
export const SERVER_PORT: string = process.env.REACT_APP_SERVER_PORT || DEFAULT_SERVER_PORT;
export const SERVER_URL: string = `http://localhost:${SERVER_PORT}`;

export const TEST_GAMES: GameData[] = [
    {
        gameUID: "0001",
        displayName: "Game One",
        gamePath: "",
        dateAdded: new Date("2025-04-15"),
    },
    {
        gameUID: "0002",
        displayName: "Game Two",
        gamePath: "",
        dateAdded: new Date("2025-04-15"),
    },
    {
        gameUID: "0003",
        displayName: "Some game with a really long display name to test how the sidebar renders this game name",
        gamePath: "",
        dateAdded: new Date("2025-04-15"),
    },
];