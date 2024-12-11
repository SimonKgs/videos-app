import Link from 'next/link'
import React from 'react'
import { CustomButton } from '../../ui/custom-button/CustomButton'

export const CtaLogin = () => {
  return (
    <section className="w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h2 className="mb-4 text-4xl tracking-tight font-semibold leading-tight text-gray-900 dark:text-white">Start Manage Your Videos Now!</h2>
                <p className="mb-6 font-light text-xl">Sign up to get started. It's free! </p>
                <Link href="/auth/login" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <CustomButton text='Get Started' className='bg-blue-600 hover:bg-blue-800'/>
                </Link>
            </div>
        </div>
    </section>
  )
}
