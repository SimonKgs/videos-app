import Link from 'next/link'
import React from 'react'

export const Unauthorized = () => {
  return (
    <div className='min-h-screen bg-black flex flex-col justify-center items-center text-white '>
        <h1 className='text-3xl my-5'>403 | Forbidden</h1>
        <Link className='text-xl hover:text-slate-400 hover:underline' href="/auth/login">Please login</Link>
    </div>
  )
}
