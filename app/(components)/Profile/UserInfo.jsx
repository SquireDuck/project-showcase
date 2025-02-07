"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const UserInfo = () => {
    const { data: session } = useSession();
    return (
        <div>
            {session && session.user ? (
                <div className="flex flex-col items-center border-b-[2px] pb-5 pt-10">
                    <Image
                        src={session.user.image}
                        alt='user_image'
                        width={75}
                        height={75}
                        className='rounded-full object-cover'
                    />
                    <h2 className="text-[30px] font-bold text-blue-500 pt-2">{session.user.name}</h2>
                    <h2 className="text-gray-400">{session.user.email}</h2>
                </div>
            ) : null}
        </div>
    );
}

export default UserInfo
