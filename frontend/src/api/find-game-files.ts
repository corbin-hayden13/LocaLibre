import { API_URLS } from "./endpoints";

interface ResponseSchema {
    status: string;
    folderPath?: string;
}

export default async function findGameFiles(): Promise<string> {
    let folderPath: string = "";

    try {
        const response = await fetch(API_URLS.findGameFiles);
        if (!response.ok) throw new Error("Failed to find folder on backend");

        const data: ResponseSchema = (await response.json() as ResponseSchema);
        folderPath = data.folderPath || "";
    } catch (err) {
        console.error(`Folder selection failed with error: ${err}`);
    }

    return folderPath;
}