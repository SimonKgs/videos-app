'use client';
import { uploadVideo } from '@/actions/videos/uploadVideo';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { VscLoading } from 'react-icons/vsc';

export function UploadVideoForm() {
  const [videoName, setVideoName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams()

  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    throw new Error("User ID must not be null or undefined");
  }



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    setVideoFile(event.target.files?.[0] || null)
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden input's click
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }

    // Create a form data payload
    

    try {
       const response = await uploadVideo( { videoName, videoFile, userId } );

       console.log(response);

       if (!response.ok) {
        throw new Error('Failed to upload video.');
       }
       
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className='flex flex-col gap-4 md:w-6/12 w-full px-2' onSubmit={handleSubmit}>
        <div className="flex flex-col w-full items-center mb-2">
          <label className="flex flex-1 w-full p-2 text-slate-300 font-medium text-xl">
            Video Name
          </label>
          <input
            className="flex flex-1 w-full p-2 px-4 rounded-md border bg-slate-300 text-slate-800 text-lg"
            type="text"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            required
            placeholder='Insert video name'
          />
        </div>

        <div className="flex flex-col w-full gap-3">
          <button
          type='button'
            onClick={handleButtonClick}
            className="flex-1 flex items-center justify-center py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
          >
            Upload File
          </button>
          <div className={`flex-1 flex p-2 items-center justify-center  ${fileName ? 'bg-indigo-300 text-black' : 'bg-black'}`}>
            {fileName ? `Selected file: ${fileName}` : "No file selected"}
          </div>
        </div>
        {/* Hidden File Input */}
        <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
        />

        <button 
          disabled={isUploading}
          type="submit"
          className={`mt-6 transition-all duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600'}`}
        >
          { isUploading ? 'Uploading...' : 'Upload Video' }
        </button>
        {
          isUploading && (
            <div className='flex items-center justify-center'>
              <VscLoading fill="#ff3e00" size={70} className="animate-spin" />        
            </div>
          )
        }
    </form>
  );
}
