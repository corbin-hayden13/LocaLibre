import { useState } from "react";
import { AddIcon, Button, SearchInput } from "evergreen-ui";
import { ELEM_BACKGROUND, TEXT_BOLD, BUTTON_SECONDARY } from "../common-themes";
import AddGameModal from "./AddGameModal";

export function WebAppSubheading() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [addGameModalVisible, setAddGameModalVisible] = useState<boolean>(false);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        // TODO - Search logic here
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 15,
                paddingTop: 15,
                background: ELEM_BACKGROUND,
                minHeight: "40px",
                maxHeight: "70px",
                maxWidth: "100%",
                boxSizing: "border-box",
                boxShadow: '0 5px 10px -2px rgba(0, 0, 0, 0.9)', // bottom-only shadow
                zIndex: 1,  // Subheading shadow renders over SidebarCards
                flex: "1 1 auto",
            }}
        >
            <SearchInput
                placeholder="Search Games..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <Button
                onClick={() => setAddGameModalVisible((prevValue) => !prevValue)}
                iconAfter={<AddIcon color={TEXT_BOLD} />}
                background={BUTTON_SECONDARY}
            >
                <text style={{color: TEXT_BOLD, fontWeight: "bold"}} >Add Game</text>
            </Button>
            <AddGameModal isShown={addGameModalVisible} onClose={() => setAddGameModalVisible((prevValue) => !prevValue)} />
        </div>
    );
}