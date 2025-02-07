"use client";

import Image from 'next/image'
import logo from '../images/logo.png'
import {HiOutlinePencilSquare} from 'react-icons/hi2'
import { HiUserPlus } from "react-icons/hi2";
import { HiUserMinus } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Header = () => {
    const USER_IMG = 'data:image/jpeg;base64,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';
    const {data:session} = useSession();
    const router = useRouter();

    return (
        <div className='flex justify-between border-b-[2px] border-blue-500 p-4'>
            <Image src={logo} alt="logo" priority width={100} height={50} 
            className='w-[80px] h-auto object-contain hover:cursor-pointer'
            onClick={() => router.push('/')}/>

            <div className='flex gap-5 items-center'>
            
                <button className='px-4 py-4 bg-blue-500 text-white rounded-full'
                onClick={() => router.push('/create-project')}>

                    <span className='hidden sm:block'>CREATE POST</span> 
                    <HiOutlinePencilSquare className='sm:hidden'/>

                </button>

                <button className='px-4 py-4 bg-gray-200 text-gray-700 rounded-full'
                onClick={() => {
                    if (session) {
                        signOut({ callbackUrl: '/' });
                    } else {
                        signIn();
                    }
                }}>

                    {session ? (
                    <>
                    <span className='hidden sm:block'>SIGN OUT</span> 
                    <HiUserMinus className='sm:hidden'/>
                    </>
                    ) : (
                    <>
                        <span className='hidden sm:block'>SIGN IN</span> 
                        <HiUserPlus className='sm:hidden'/>
                    </>
                    )}

                </button>

                {session ? <Image 
                    src={session.user.image} 
                    width={48} 
                    height={48} 
                    alt='user_image' 
                    className='rounded-full object-cover cursor-pointer'
                    onClick={() => router.push('/profile')}
                /> : null}
            </div>
        </div>
    )
}

export default Header
