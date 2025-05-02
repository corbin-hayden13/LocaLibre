import { TextInput, Button } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import findGameFiles from "../../api/find-game-files";

interface PropsWrapper {
    placeholder?: string;
    setFolderPathCallback?: (folderPath: string) => void;
}

export default function FolderPicker({ placeholder, setFolderPathCallback }: PropsWrapper) {
    const [folderPath, setFolderPath] = useState<string>("");

    useEffect(() => { if (setFolderPathCallback) setFolderPathCallback(folderPath) }, [folderPath]);

    const handleFolderClick = async () => {
        const gamePath: string = await findGameFiles();
        console.log(`Found the game path: \"${gamePath}\"`);
        setFolderPath(gamePath);
    };
    
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                flex: 1,
            }}
        >
            <TextInput
                placeholder={placeholder ? placeholder : "Enter relative path or choose folder"}
                value={folderPath}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderPath(e.target.value)}
                width={"100%"}
            />
            <Button onClick={handleFolderClick} >Choose Folder</Button>
        </div>
    );
}