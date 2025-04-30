import { useState } from "react";
import { GameData, SetState, XYPos } from "../../common";
import { ELEM_BACKGROUND, ELEM_HEADING, TEXT_BASE, TEXT_BOLD, TEXT_SELECTED } from "../../common-themes";
import GameQuickOptionsMenu from "../GameQuickOptionsMenu";

interface GameLabelProps {
    setQuickOptionsVisible: SetState<boolean>,
    setCurrGameData: SetState<GameData | undefined>,
    setCursorPosition: SetState<XYPos>,
}

const handleGameLabelClick = (event: React.MouseEvent<HTMLDivElement>, gameData: GameData, props: GameLabelProps) => {
    props.setCurrGameData(gameData);
    
    switch (event.button) {
        case 0:  // Left click
            console.log(`Left click event on ${gameData.displayName}`);
            break;
        case 2:  // Right click
            props.setCursorPosition({ x: event.clientX, y: event.clientY });
            props.setQuickOptionsVisible(true);
            console.log(`Right click event on ${gameData.displayName}`);
            break;
        
        default:
            console.log(`Unsupported click event: ${event.button}`);
            break;
    }
};

interface PropsWrapper {
    cardTitle: string,
    listGameData: GameData[]
}

export function SidebarCard({ cardTitle, listGameData }: PropsWrapper) {
    const [quickOptionsVisible, setQuickOptionsVisible] = useState<boolean>(false);
    const [currGameData, setCurrGameData] = useState<GameData>();
    const [cursorPosition, setCursorPosition] = useState<XYPos>({ x: 0, y: 0 });

    const gameLabelProps: GameLabelProps = {
        setQuickOptionsVisible,
        setCurrGameData,
        setCursorPosition,
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                background: ELEM_BACKGROUND,
                borderRadius: 10,
                border: `1px solid ${TEXT_SELECTED}`,
                maxWidth: "100%", // Stop text from expanding the card too far
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 10,
                    padding: 10,
                    background: ELEM_HEADING
                }}
            >
                <text style={{ color: TEXT_BOLD, fontWeight: "bold", textAlign: "center" }} >{cardTitle}</text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 5,
                    gap: 5,
                }}
            >
                {listGameData.map((gameData, index) => (
                    <div
                        key={`game-label-${index}`}
                        style={{
                            paddingBottom: 3,
                            color: TEXT_BASE,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            borderBottom: index === listGameData.length - 1 ? "none" : `1px solid ${ELEM_HEADING}`,
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                        onMouseUp={(e) => handleGameLabelClick(e, gameData, gameLabelProps)}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <span>{gameData.displayName}</span>
                    </div>
                ))}
            </div>
            <GameQuickOptionsMenu
                isVisible={quickOptionsVisible}
                position={cursorPosition}
                onClose={() => setQuickOptionsVisible(false)}
                gameData={currGameData}
            />
        </div>
    );
}