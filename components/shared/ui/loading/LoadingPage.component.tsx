import React from 'react'
import { VscLoading } from 'react-icons/vsc'

export const LoadingPage = () => {
  return (
    <div className='min-h-screen bg-black flex flex-col justify-center items-center'>
        <VscLoading fill="#ff3e00" size={100} className="animate-spin" />        
    </div>
  )
}
