import { Dialog, TextInputField } from "evergreen-ui";
import { ChangeEvent } from "react";

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
            title="Add A New Game"
            confirmLabel="Add Game"
            onCloseComplete={onClose}
        >
            <TextInputField
                label="Display Name"
                required
                placeholder="Enter game name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DISPLAY_NAME, e.target.value)}
            />
            <TextInputField
                label="Game Path"
                required
                placeholder="Enter game path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GAME_PATH, e.target.value)}
            />
            <TextInputField
                label="Cover Image Path"
                placeholder="Enter cover image path"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(COVER_IMAGE, e.target.value)}
            />
            <TextInputField
                label="Genre"
                placeholder="Enter genre"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(GENRE, e.target.value)}
            />
            <TextInputField
                label="Developer"
                placeholder="Enter developer name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DEVELOPER, e.target.value)}
            />
            <TextInputField
                label="Description"
                placeholder="Enter game description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(DESCRIPTION, e.target.value)}
            />
        </Dialog>
    );
}