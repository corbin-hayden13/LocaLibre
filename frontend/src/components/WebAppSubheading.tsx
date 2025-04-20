import { useState } from "react";
import { AddIcon, Button, SearchInput } from "evergreen-ui";
import { ELEM_BACKGROUND, TEXT_BOLD, BUTTON_SECONDARY } from "../common-themes";

export function WebAppSubheading() {
    const [searchQuery, setSearchQuery] = useState<string>("")

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Search logic here
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
                flex: "1 1 auto",
            }}
        >
            <SearchInput
                placeholder="Search Games..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <Button
                iconAfter={<AddIcon color={TEXT_BOLD} />}
                background={BUTTON_SECONDARY}
            >
                <text style={{color: TEXT_BOLD, fontWeight: "bold"}} >Add Game</text>
            </Button>
        </div>
    );
}