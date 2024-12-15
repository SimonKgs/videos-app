'use client';
import Link from 'next/link';
import { CustomButton } from '@/components';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VscLoading } from 'react-icons/vsc';


export default function () {
    
    const { isAuthenticated, user, login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

/**
 * Handles the login process by calling the login function with the provided email and password.
 * 
 * After attempting to log in, it retrieves the current message from the authentication store.
 * If there is a message, it sets it as the error message for display.
 *
 * @remarks This function is asynchronous and should be called within an async context.
 */

    const handleLogin = async() => {
        setLoading(true);
        await login(email, password);
        const currentMessage = useAuthStore.getState().message;

        if (currentMessage && currentMessage !== 'success') {
            setError(currentMessage);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push(`/${user?.id}/videos`);
        }
    }, [isAuthenticated]);


    return (
        <div className="flex flex-col pt-32 sm:pt-52">

        <h1 className='text-4xl font-extrabold text-center mb-5'>Login</h1>

        <div className="flex flex-col justify-center">

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
                className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-2"
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            { error && <p className="text-red-500 mb-5">{error}</p> }

            <CustomButton
                attachedFunction={handleLogin} 
                className='text-gray-200 bg-blue-600 hover:bg-blue-800' 
                text="Login" 
            />

            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">Or</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href='/auth/register'>
                <CustomButton className='w-full text-gray-200 bg-green-600 hover:bg-green-800' text="Create new account" />
            </Link>

            { loading &&
                <div className="flex items-center justify-center w-full my-5">
                     <VscLoading fill="#ff3e00" size={70} className="animate-spin" />
                </div>
            }
        </div>
        </div>
    );
}