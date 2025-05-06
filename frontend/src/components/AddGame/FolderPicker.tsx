import { TextInput, Button } from "evergreen-ui";
import React, { useState, } from "react";
import { findGameFiles } from "../../api";

interface PropsWrapper {
    placeholder?: string;
    setFolderPathCallback?: (folderPath: string) => void;
}

export default function FolderPicker({ placeholder, setFolderPathCallback }: PropsWrapper) {
    const [folderPath, setFolderPath] = useState<string>("");

    const handleFolderClick = async () => {
        const gamePath: string = await findGameFiles();
        console.log(`Found the game path: \"${gamePath}\"`);
        setFolderPath(gamePath);
        if (setFolderPathCallback) setFolderPathCallback(folderPath);
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFolderPath(e.target.value);
                    if (setFolderPathCallback) setFolderPathCallback(folderPath);
                }}
                width={"100%"}
            />
            <Button onClick={handleFolderClick} >Choose Folder</Button>
        </div>
    );
}