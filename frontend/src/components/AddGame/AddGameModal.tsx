import { Button, ChevronDownIcon, Dialog, FormFieldLabel, TagInput, TextInputField } from "evergreen-ui";
import { ChangeEvent, useState, useEffect } from "react";
import { GameData, GameDataProp, SetState } from "../../common";
import { ELEM_BACKGROUND, ELEM_HEADING, TEXT_BASE, TEXT_BOLD } from "../../common-themes";
import { addGame } from "../../api";
import FolderPicker from "./FolderPicker";
import ImageUpload from "./ImageUpload";

const DISPLAY_NAME: GameDataProp = "displayName";
const GAME_PATH: GameDataProp = "gamePath";
const GENRE: GameDataProp = "genre";
const DEVELOPER: GameDataProp = "developer";
const DESCRIPTION: GameDataProp = "description";
// const TAGS: GameDataProp = "tags";
// const COLLECTIONS: GameDataProp = "collections";
const VERSION: GameDataProp = "version";
// const RELEASE_DATE: GameDataProp = "releaseDate";

const EMPTY_GAME_DATA: GameData = {
    gameUID: "",
    displayName: "",
    gamePath: "",
    dateAdded: new Date(),
    coverImagePath: undefined,
    releaseDate: undefined,
    version: undefined,
    genre: undefined,
    description: undefined,
    developer: undefined,
    tags: [],
    collections: [],
};
const AUTOCOMPLETE_TAGS: string[] = ["NSFW", "SFW", "FPS", "Unity WebGL", "Godot", "Jam Game", "2D", "3D"];
const AUTOCOMPLETE_COLLECTIONS: string[] = ["Favorites", "All Games", "Hidden"];

const handleInputChange = (gameDataProp: GameDataProp, value: string, setCurrGameData: SetState<GameData>) => {
    setCurrGameData((prevData) => ({ ...prevData, [gameDataProp]: value }));
};

interface PropsWrapper {
    isShown: boolean;
    onClose?: () => void;
}

export default function AddGameModal({isShown, onClose}: PropsWrapper) {
    const [showOptionalInputs, setShowOptionalInputs] = useState<boolean>(false);

    const [currGameData, setCurrGameData] = useState<GameData>(EMPTY_GAME_DATA);
    const [tags, setTags] = useState<string[]>(EMPTY_GAME_DATA.tags || []);
    const [collections, setCollections] = useState<string[]>(EMPTY_GAME_DATA.collections || []);

    useEffect(() => {
        setCurrGameData((prevData) => ({...prevData, tags }));
    }, [tags]);
    useEffect(() => {
        setCurrGameData((prevData) => ({...prevData, collections }));
    }, [collections]);

    const handleOnCloseComplete = () => {
        if (onClose) onClose();
        setCurrGameData(EMPTY_GAME_DATA);
    };

    const handleAddGame = async (close: () => void) => {
        const newGameData: GameData | null = await addGame(currGameData);
        if (newGameData) {
            setCurrGameData(newGameData);
            console.log(`Add game success:\n${JSON.stringify(newGameData)}`);
        }
        else {
            console.error("Add game fail: newGameData is null");
        }

        close();
    };

    return (
        <Dialog
            isShown={isShown}
            title={<span style={{ color: TEXT_BOLD, fontWeight: "bold" }} >Add A New Game</span>}
            confirmLabel="Add Game"
            onCloseComplete={handleOnCloseComplete}
            containerProps={{
                style: { background: ELEM_BACKGROUND, color: TEXT_BASE, border:`2px solid ${TEXT_BOLD}` },
            }}
            contentContainerProps={{
                style: { color: TEXT_BASE }
            }}
            footer={({ close }) => (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }} >
                    <Button
                        style={{
                            background: ELEM_HEADING,
                            color: TEXT_BASE
                        }}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: TEXT_BOLD
                        }}
                        onClick={() => handleAddGame(close)}
                    >
                        Add Game
                    </Button>
                </div>
            )}
        >
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Display Name *</span>}
                value={currGameData[DISPLAY_NAME]}
                placeholder="Enter game name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DISPLAY_NAME, e.target.value, setCurrGameData)}
            />
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 20, gap: 10, }} >
                <FormFieldLabel><span style={{ color: TEXT_BASE }} >Game Folder Path *</span></FormFieldLabel>
                <FolderPicker
                    setFolderPathCallback={
                        (folderPath: string) => handleInputChange(GAME_PATH, folderPath, setCurrGameData)
                    }
                />
            </div>
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Description</span>}
                value={currGameData[DESCRIPTION]}
                placeholder="Enter game description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DESCRIPTION, e.target.value, setCurrGameData)}
            />
            {/* Collapsable Input Section For Optional Inputs */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    background: ELEM_HEADING,
                    border: `1px solid ${TEXT_BOLD}`,
                    borderRadius: 4,
                    padding: 10,
                }}
            >
                {/* Header */}
                <div
                    onClick={() => setShowOptionalInputs(prev => !prev)}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                >
                    <span style={{ color: TEXT_BOLD, fontWeight: "bold" }} >Advanced Options</span>
                    <ChevronDownIcon
                        style={{
                            transform: showOptionalInputs ? "rotate(180deg)" : "rotate(0deg)",
                            transistion: "transform 0.3s ease",
                        }}
                    />
                </div>
                {/* Input Content */}
                {showOptionalInputs &&
                    <div
                        style={{ padding: 10, }}
                    >
                        <ImageUpload />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 10,
                            }}
                        >
                            <TextInputField
                                label={<span style={{ color: TEXT_BASE }} >Genre</span>}
                                value={currGameData[GENRE]}
                                placeholder="Enter genre"
                                width="100%"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GENRE, e.target.value, setCurrGameData)}
                            />
                            <TextInputField
                                label={<span style={{ color: TEXT_BASE }} >Version</span>}
                                value={currGameData[VERSION]}
                                placeholder="Enter game version"
                                width="100%"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(VERSION, e.target.value, setCurrGameData)}
                            />
                        </div>
                        <TextInputField
                            label={<span style={{ color: TEXT_BASE }} >Developer</span>}
                            value={currGameData[DEVELOPER]}
                            placeholder="Enter developer name"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DEVELOPER, e.target.value, setCurrGameData)}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: 20,
                                gap: 10,
                            }}
                        >
                            <FormFieldLabel><span style={{ color: TEXT_BASE }} >Enter Tags</span></FormFieldLabel>
                            <TagInput
                                values={currGameData.tags}
                                autocompleteItems={AUTOCOMPLETE_TAGS}
                                onChange={(values: string[]) => setTags(values)}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            <FormFieldLabel><span style={{ color: TEXT_BASE }} >Enter Collections</span></FormFieldLabel>
                            <TagInput
                                values={currGameData.collections}
                                autocompleteItems={AUTOCOMPLETE_COLLECTIONS}
                                onChange={(values: string[]) => setCollections(values)}
                            />
                        </div>
                    </div>
                }
            </div>
        </Dialog>
    );
}