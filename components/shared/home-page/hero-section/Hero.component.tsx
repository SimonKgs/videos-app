import React from 'react'

export const Hero = () => {
  return (
    <div className="relative flex w-full">
        <video
            className="w-full h-full max-h-[80vh] object-cover" 
            src="https://res.cloudinary.com/dtts0tqni/video/upload/v1734185913/videos/NOBORRAR.mp4" 
            autoPlay 
            loop 
            muted 
        />
        <div className="hidden md:absolute md:inset-10 md:flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-white text-8xl font-bold">Videos App</h1>
            <p className="text-white text-2xl font-bold">A place to store your favorite videos</p>
        </div>
    </div>
  )
}
