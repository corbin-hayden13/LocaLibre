import { TextInput, Button } from "evergreen-ui";
import React, { useRef, useState, useEffect } from "react";

interface PropsWrapper {
    setFolderPathCallback?: (folderPath: string) => void;
}

export default function FolderPicker({setFolderPathCallback}: PropsWrapper) {
    const [folderPath, setFolderPath] = useState<string>("");
    const inputRef = useRef<HTMLElement | null>(null);

    useEffect(() => { if (setFolderPathCallback) setFolderPathCallback(folderPath) }, [folderPath]);

    const handleFolderClick = () => {
        inputRef.current?.click();
    };

    const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderPath("Under Development");
    };
    
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
            }}
        >
            <TextInput
                placeholder="Enter relative path or choose folder"
                value={folderPath}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderPath(e.target.value)}
            />
            <Button onClick={handleFolderClick} >Choose Folder</Button>
            <input
                type="file"
                multiple
                ref={(elem) => {
                    if (elem) {
                        elem.setAttribute("webkitdirectory", "true");
                        elem.setAttribute("directory", "");
                        inputRef.current = elem;
                    }
                }}
                style={{ display: "none" }}
                onChange={handleFolderSelect}
            />
        </div>
    );
}