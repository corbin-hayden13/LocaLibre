import { ELEM_HEADING, TEXT_BOLD } from "../common-themes";

export function WebAppHeading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
                background: ELEM_HEADING,
                minHeight: "40px",
                maxHeight: "50px",
                maxWidth: "100%",
                boxSizing: "border-box",
                flex: "1 1 auto",
            }}
        >
            <h2 style={{ color: TEXT_BOLD, marginLeft: "20px" }} >LocaLibre</h2>
        </div>
    );
}