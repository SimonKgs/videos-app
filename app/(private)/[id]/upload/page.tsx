import { UploadVideoForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Video",
    description: "Upload your videos to our platform",
};

export default function UploadPage() {
    return (
        <div className="flex min-h-screen sm:w-1/2 xl:w-1/4 flex-col items-center pt-24">
            <h1 className="text-2xl">Upload Page</h1>
            <p className="text-gray-500 text-xl">Max size of video is 5000KB</p>
            <UploadVideoForm />
        </div>
    );
}