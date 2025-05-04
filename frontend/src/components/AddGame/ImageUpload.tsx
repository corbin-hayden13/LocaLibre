import { useState, useRef } from "react";
import { FormFieldLabel, Button } from "evergreen-ui";
import { TEXT_BASE, } from "../../common-themes";

export default function ImageUpload() {
    const iconInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const [iconImgFile, setIconImgFile] = useState<File | null>(null);
    const [bannerImgFile, setBannerImgFile] = useState<File | null>(null);

    const handleUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void
    ) => {
        setFile(e.target.files?.[0] || null);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginBottom: 20,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 10,
                }}
            >
                <FormFieldLabel><span style={{ color: TEXT_BASE }} >Game Icon</span></FormFieldLabel>
                <Button
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                    onClick={() => iconInputRef.current?.click()}
                >
                    {iconImgFile ? iconImgFile.name : "Upload Game Icon"}
                </Button>
                <input
                    ref={iconInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, setIconImgFile)}
                    style={{ display: "none" }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 10,
                }}
            >
                <FormFieldLabel><span style={{ color: TEXT_BASE }} >Game Banner</span></FormFieldLabel>
                <Button
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                    onClick={() => bannerInputRef.current?.click()}
                >
                    {bannerImgFile ? bannerImgFile.name : "Upload Game Banner"}
                </Button>
                <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, setBannerImgFile)}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
}