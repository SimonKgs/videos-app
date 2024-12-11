'use client';

import { CustomButton } from '@/components';
import { useAuthStore } from '@/store';
import Link from 'next/link';

export default function () {

    const { login } = useAuthStore();

    const handleLogin = () => {
        const mockUser = { id: '1', name: 'John Doe' };
        const mockToken = 'abc123';
        // login(mockUser, mockToken);
    };

    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

        <h1 className='text-4xl font-extrabold text-center mb-5'>Login</h1>

        <div className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
            className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
            type="email"
            placeholder='eg: email@domain.com'
            />

            <label htmlFor="password">Password</label>
            <input
            className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
            type="password"
            placeholder='*******'
            />

            <CustomButton
                attachedFunction={() => handleLogin()} 
                className='text-gray-200 bg-blue-600 hover:bg-blue-800' 
                text="Login" 
            />


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href='/auth/register'>
                <CustomButton className='w-full text-gray-200 bg-green-600 hover:bg-green-800' text="Register" />
            </Link>

        </div>
        </div>
    );
}