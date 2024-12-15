import { UploadVideoForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Video",
    description: "Upload your videos to our platform",
};

export default function UploadPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center pt-24">
            <div className="flex flex-col w-full lg:w-3/4 2xl:h-2/4 items-center">
                <h1 className="text-2xl">Upload Page</h1>
                <p className="text-gray-500 text-xl">Max size of video is 5000KB</p>
                <UploadVideoForm />
            </div>
        </div>
    );
}