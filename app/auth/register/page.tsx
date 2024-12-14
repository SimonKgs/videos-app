'use client';

import Link from 'next/link';
import { CustomButton } from '@/components';
import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function () {

    const { user, isAuthenticated,register } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();



    const validateForm = () => {
        const newErrors: Record<string, string> = {};
    
        if (!name.trim()) newErrors.name = 'Name is required.';
        if (!email.trim()) {
          newErrors.email = 'Email is required.';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          newErrors.email = 'Enter a valid email.';
        }
        if (!password || password.length < 8) newErrors.password = 'Password min length is 8.';
        if (password !== password2) newErrors.password2 = 'Passwords do not match.';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Valid if no errors
    };

    const handleRegister = async () => {
        if (!validateForm())  return;

        try {
            await register(name, email, password);
            const updatedUser = useAuthStore.getState().user;
            
            
            if (!updatedUser?.id) {
                const newErrors: Record<string, string> = {};
                newErrors.form = `Registration failed. Try again.`;
                setErrors(newErrors);
            }
            
        } catch (error) {
            setErrors({ form: 'Registration failed. Try again.' });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push(`/${user?.id}/videos`);
        }
    }, [isAuthenticated]);



    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

        <h1 className='text-4xl font-extrabold text-center mb-5'>Register</h1>

        <div className="flex flex-col">

            <div className='flex flex-col w-full'>
                <label htmlFor="name">Name</label>
                <input
                    className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-2"
                    type="text"
                    id='name'
                    placeholder='eg: email@domain.com'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 mb-5">{errors.name}</p>}
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor="email">Email</label>
                <input
                    className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-2"
                    type="email"
                    id='email'
                    placeholder='eg: email@domain.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 mb-5">{errors.email}</p>}
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor="password">Password</label>
                <input
                    className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-2"
                    type="password"
                    id="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 mb-5">{errors.password}</p>}
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor="password">Repeat the password</label>
                <input
                    className="text-zinc-950 px-5 py-2 border bg-gray-200 rounded mb-2"
                    type="password"
                    id="password2"
                    placeholder="*******"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                {errors.password2 && <p className="text-red-500 mb-5">{errors.password2}</p>}
            </div>

            {errors.form && <p className="text-red-500 mb-5">{errors.form}</p>}

            <CustomButton
                attachedFunction={handleRegister} 
                className='text-gray-200 bg-green-600 hover:bg-green-800 mt-5' 
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