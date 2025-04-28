import { useEffect, useRef } from "react";
import { XYPos, GameData, } from "../common";
import { TEXT_BASE, ELEM_HEADING, WEB_APP_BACKGROUND } from "../common-themes";

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
    return !gameData ? null : (
        <div
            ref={menuRef}
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                background: ELEM_HEADING,
                borderRadius: 6,
                border: `1px solid ${WEB_APP_BACKGROUND}`,
                boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
                zIndex: 1000,
                padding: 3,
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
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderBottom: index === MENU_OPTIONS.length - 1 ? "none" : `1px solid ${TEXT_BASE}`,
                    }}
                >
                    {option}
                </div>
            ))}
        </div>
    );
}