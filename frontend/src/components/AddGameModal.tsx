import { Button, Dialog, TextInputField } from "evergreen-ui";
import { ChangeEvent, useState } from "react";
import { GameData, GameDataProp, SetState } from "../common";
import { ELEM_BACKGROUND, ELEM_HEADING, TEXT_BASE, TEXT_BOLD } from "../common-themes";

const DISPLAY_NAME: GameDataProp = "displayName";
const GAME_PATH: GameDataProp = "gamePath";
const COVER_IMAGE: GameDataProp = "coverImagePath";
const GENRE: GameDataProp = "genre";
const DEVELOPER: GameDataProp = "developer";
const DESCRIPTION: GameDataProp = "description";
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

const handleInputChange = (gameDataProp: GameDataProp, value: string, setCurrGameData: SetState<GameData>) => {
    setCurrGameData((prevData) => ({ ...prevData, [gameDataProp]: value }));
    console.log(`Changing ${gameDataProp} to ${value}`);
};

interface PropsWrapper {
    isShown: boolean;
    onClose?: () => void;
}

export default function AddGameModal({isShown, onClose}: PropsWrapper) {
    const [currGameData, setCurrGameData] = useState<GameData>(EMPTY_GAME_DATA);

    return (
        <Dialog
            isShown={isShown}
            title={<span style={{ color: TEXT_BOLD, fontWeight: "bold" }} >Add A New Game</span>}
            confirmLabel="Add Game"
            onCloseComplete={() => {
                if (onClose) onClose();
                setCurrGameData(EMPTY_GAME_DATA);
            }}
            containerProps={{
                style: { background: ELEM_BACKGROUND, color: TEXT_BASE, border:`2px solid ${TEXT_BOLD}` }
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
                        onClick={() => {
                            // TODO - Add game logic
                            close();
                        }}
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
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Description</span>}
                value={currGameData[DESCRIPTION]}
                placeholder="Enter game description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DESCRIPTION, e.target.value, setCurrGameData)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Game Path</span>}
                value={currGameData[GAME_PATH]}
                placeholder="Enter game path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GAME_PATH, e.target.value, setCurrGameData)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Cover Image Path</span>}
                value={currGameData[COVER_IMAGE]}
                placeholder="Enter cover image path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(COVER_IMAGE, e.target.value, setCurrGameData)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Genre</span>}
                value={currGameData[GENRE]}
                placeholder="Enter genre"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GENRE, e.target.value, setCurrGameData)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Developer</span>}
                value={currGameData[DEVELOPER]}
                placeholder="Enter developer name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DEVELOPER, e.target.value, setCurrGameData)}
            />
        </Dialog>
    );
}