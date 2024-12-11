import Link from "next/link"

export const PageNotFound = () => {
  return (
    <div className='min-h-screen bg-black flex flex-col justify-center items-center text-white '>
        <h1 className='text-3xl my-5'>404 | Page Not Found</h1>
        <Link className='text-xl hover:text-slate-400 hover:underline' href="/">Go home</Link>
    </div>
  )
}
