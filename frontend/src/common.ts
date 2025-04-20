export interface GameData {
    gameUID: string,         // Internal unique game identifier
    displayName: string,     // The name of the game
    dateAdded: Date,         // Date uploaded to the tool
    genre?: string,          // Main genre of the game, subgenres should be in tags
    description?: string,    // Game description
    developer?: string,      // Name of developer of the game
    tags?: string[],         // NSFW, SFW, 3D, 2D, and other game identifiers (see itch.io for game tag examples)
    collections?: string[],  // Favorites, custom collections
}

export const TEST_GAMES: GameData[] = [
    {
        gameUID: "0001",
        displayName: "Game One",
        dateAdded: new Date("2025-04-15"),
    },
    {
        gameUID: "0002",
        displayName: "Game Two",
        dateAdded: new Date("2025-04-15"),
    },
    {
        gameUID: "0003",
        displayName: "Some game with a really long display name to test how the sidebar renders this game name",
        dateAdded: new Date("2025-04-15"),
    },
];