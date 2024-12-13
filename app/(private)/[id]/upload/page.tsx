import { UploadVideoForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Video",
    description: "Upload your videos to our platform",
};

export default function UploadPage() {
    return (
        <div className="flex min-h-screen flex-col items-center pt-24">
            <h1 className="text-2xl">Upload Page</h1>
            <UploadVideoForm />
        </div>
    );
}