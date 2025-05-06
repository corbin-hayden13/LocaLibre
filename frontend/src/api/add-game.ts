import { GameData } from "../common";
import { API_URLS } from "./endpoints";

interface ResponseSchema {
    status: string,
    gameData?: GameData,
    errors?: string,
}

export default async function addGame(gameData: GameData): Promise<GameData | null> {
    let returnGameData: GameData | null = null;

    try {
        const response = await fetch(API_URLS.addGame, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
        });

        const data: ResponseSchema = (await response.json() as ResponseSchema);
        if (!response.ok || !data.gameData) throw new Error(data.errors);
        else returnGameData = data.gameData;

        console.log(`gameData received from server: ${JSON.stringify(returnGameData)}`);

    } catch (err) {
        console.error(`Error adding game: ${err}`);
        console.error(`gameData sent to server: ${JSON.stringify(gameData)}`);
    }

    return returnGameData;
}