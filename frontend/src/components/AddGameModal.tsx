import { Button, Dialog, TextInputField } from "evergreen-ui";
import { ChangeEvent } from "react";
import { ELEM_BACKGROUND, ELEM_HEADING, TEXT_BASE, TEXT_BOLD } from "../common-themes";

const DISPLAY_NAME: string = "displayName";
const GAME_PATH: string = "gamePath";
const COVER_IMAGE: string = "coverImagePath";
const GENRE: string = "genre";
const DEVELOPER: string = "developer";
const DESCRIPTION: string = "description";

const handleInputChange = (input: string, value: string) => {
    switch (input) {
        case DISPLAY_NAME:
            break;
        
        case GAME_PATH:
            break;

        case COVER_IMAGE:
            break;

        case GENRE:
            break;

        case DEVELOPER:
            break;
    
        case DESCRIPTION:
            break;
    }
};

interface PropsWrapper {
    isShown: boolean;
    onClose?: () => void;
}

export default function AddGameModal({isShown, onClose}: PropsWrapper) {
    return (
        <Dialog
            isShown={isShown}
            title={<span style={{ color: TEXT_BOLD, fontWeight: "bold" }} >Add A New Game</span>}
            confirmLabel="Add Game"
            onCloseComplete={onClose}
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
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: TEXT_BOLD
                        }}
                    >
                        Add Game
                    </Button>
                </div>
            )}
        >
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Display Name *</span>}
                placeholder="Enter game name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DISPLAY_NAME, e.target.value)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Game Path</span>}
                placeholder="Enter game path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GAME_PATH, e.target.value)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Cover Image Path</span>}
                placeholder="Enter cover image path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(COVER_IMAGE, e.target.value)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Genre</span>}
                placeholder="Enter genre"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GENRE, e.target.value)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Developer</span>}
                placeholder="Enter developer name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DEVELOPER, e.target.value)}
            />
            <TextInputField
                label={<span style={{ color: TEXT_BASE }} >Description</span>}
                placeholder="Enter game description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DESCRIPTION, e.target.value)}
            />
        </Dialog>
    );
}