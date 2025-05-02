import { useState, useRef } from "react";
import { FileUploader, Image, FormFieldLabel, } from "evergreen-ui";
import { TEXT_BASE, } from "../../common-themes";

export default function ImageUpload() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleUpload = (files: File[]) => {
        const file: File = files[0];

        if (file && file.type.startsWith("image/")) {
            const reader: FileReader = new FileReader();

            reader.onloadend = () => setImageSrc(reader.result as string);

            reader.readAsDataURL(file);
        }
        else {
            setImageSrc(null);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
            }}
        >
            <FileUploader
                label={<span style={{ color: TEXT_BASE }} >Game Banner Upload</span>}
                maxFiles={1}
                maxSizeInBytes={50 * 1024 * 1024}
                onChange={handleUpload}
                accept="image/*"
            />
            <FileUploader
                label={<span style={{ color: TEXT_BASE }} >Game Icon Upload</span>}
                maxFiles={1}
                maxSizeInBytes={50 * 1024 * 1024}
                onChange={handleUpload}
                accept="image/*"
            />
            {imageSrc && (
                <div>
                    <FormFieldLabel><span style={{ color: TEXT_BASE }} >Image Preview:</span></FormFieldLabel>
                    <Image src={imageSrc} alt="Game Image Preview" maxWidth="100%" />
                </div>
            )}
        </div>
    );
}