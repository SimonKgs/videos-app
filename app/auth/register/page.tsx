'use client';

import Link from 'next/link';
import { CustomButton } from '@/components';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function () {

    const { user, register } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        register(name, email, password);
    };

    useEffect(() => {
        if (user?.id) {
            router.push(`/${user?.id}/videos`);
        }
    }, [user]);


    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

        <h1 className='text-4xl font-extrabold text-center mb-5'>Register</h1>

        <div className="flex flex-col">

            <label htmlFor="name">Name</label>
            <input
                className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text"
                id='name'
                placeholder='eg: email@domain.com'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
                className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                id='email'
                placeholder='eg: email@domain.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Repeat the password</label>
            <input
                className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                id="password2"
                placeholder="*******"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />

            <CustomButton
                attachedFunction={handleRegister} 
                className='text-gray-200 bg-green-600 hover:bg-green-800' 
                text="Create new account" 
            />


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">Or</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href='/auth/login'>
                <CustomButton className='w-full text-gray-200 bg-blue-600 hover:bg-blue-800' text="Go to Login" />
            </Link>

        </div>
        </div>
    );
}