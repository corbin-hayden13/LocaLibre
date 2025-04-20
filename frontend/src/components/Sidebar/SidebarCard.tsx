import { GameData } from "../../common";
import { ELEM_BACKGROUND, ELEM_HEADING, TEXT_BASE, TEXT_BOLD } from "../../common-themes";

interface PropsWrapper {
    cardTitle: string,
    listGameData: GameData[]
}

export function SidebarCard({ cardTitle, listGameData }: PropsWrapper) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                background: ELEM_BACKGROUND,
                borderRadius: 10,
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
                    <text
                        key={`game-label-${index}`}
                        style={{
                            paddingBottom: 3,
                            color: TEXT_BASE,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            borderBottom: index === listGameData.length - 1 ? "none" : `1px solid ${ELEM_HEADING}`,
                        }}
                    >
                        {gameData.displayName}
                    </text>
                ))}
            </div>
        </div>
    );
}