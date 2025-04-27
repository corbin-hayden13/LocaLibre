import { useEffect, useRef } from "react";
import { Popover, Menu } from "evergreen-ui";
import { XYPos, GameData, SetState } from "../common";
import { TEXT_BASE } from "../common-themes";

type CallbackFunc = (option: string) => void;

const MENU_OPTIONS: string[] = ["Play", "Copy Name", "Edit",];

interface PropsWrapper {
    isVisible: boolean;
    position: XYPos;
    onClose: () => void;
    onSelectCallback?: CallbackFunc;
    gameData: GameData | undefined;
}

const handleSelectOption = (option: string, gameData: GameData, onSelectCallback?: CallbackFunc) => {

    if (onSelectCallback) onSelectCallback(option);
};

export default function GameQuickOptionsMenu({isVisible, position, onClose, onSelectCallback, gameData}: PropsWrapper) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return gameData ? (
        <div
            style={{
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
            <div
                style={{
                    color: TEXT_BASE,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {gameData.displayName}
            </div>
            <div
                ref={menuRef}
                style={{

                }}
            >
                {MENU_OPTIONS.map((option, index) => (
                    <div
                        key={`menu-option-${index + 1}`}
                        onClick={() => {
                            handleSelectOption(option, gameData, onSelectCallback);
                            onClose();
                        }}
                        style={{
                            color: TEXT_BASE,
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    ) : (<>{console.log("gameData is undefined for GameQuickOptionsMenu")}</>);
}