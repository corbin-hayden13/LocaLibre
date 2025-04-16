import { TEST_GAMES } from "../../common";
import { SidebarCard } from "./SidebarCard";

export function Sidebar() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: "20%",
                height: "100%",
                overflowY: "auto",
            }}
        >
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
            <SidebarCard cardTitle="Games" listGameData={TEST_GAMES} />
        </div>
    );
}