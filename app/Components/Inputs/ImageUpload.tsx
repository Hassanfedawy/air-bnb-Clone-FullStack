"use client";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
    
    const handleUpload = (result: any) => {
        if (result?.info?.secure_url) {
            const uploadedImageUrl = result.info.secure_url;
            onChange(uploadedImageUrl); // Update parent state with the image URL
        }
    };
    

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="wjlbtoqe"
            options={{
                maxFiles: 1,
                clientAllowedFormats: ["png", "jpg", "jpeg", "gif"],
            }}
            
        >
            {({ open }) => {
                return (
                    <div
                        className="relative cursor-pointer hover:opacity-70 transition border-2 border-dashed p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                        onClick={() => { open?.(); }}
                    >
                        <FontAwesomeIcon icon={faPhotoFilm} size="lg" />
                        <div className="font-semibold text-lg">Click to upload</div>
                        {value && (
                            <div className="absolute w-full h-full inset-0 p-5">
                                <Image alt="Uploaded" src={value} fill className="object-cover" />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};
