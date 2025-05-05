import { GenericDict, SERVER_URL } from "../common"

export const API_ENDPOINTS: GenericDict<string> = {
    findGameFiles: "/api/find-game-files",
    addGame: "/api/add-game",
    playGame: "/api/play-game",
};

export const API_URLS: GenericDict<string> = {
    findGameFiles: `${SERVER_URL}${API_ENDPOINTS.findGameFiles}`,
    addGame: `${SERVER_URL}${API_ENDPOINTS.addGame}`,
    playGame: `${SERVER_URL}${API_ENDPOINTS.playGame}`,
};