'use client'

import React from 'react'
import LogoutButton from './Logout'
import { useAuthContext } from '@/utils/AuthContext'
import Link from 'next/link'

const Header = () => {
    const { user } = useAuthContext()

    return (
        <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-4">
            <h1 className="w-3/12">
                <p className='font-semibold text-lg'>LMS</p>
            </h1>
            
            {user?.is_staff ? (
                <Link href={'/teacher'}>
                    <p className='font-semibold text-xl'>
                        Learning Management System
                    </p>
                </Link>
            ) : (
                <Link href={'/student'}>
                    <p className='font-semibold text-xl'>
                        Learning Management System
                    </p>
                </Link>
            )}

            <div className="w-3/12 flex justify-end gap-x-8 items-center">
                <Link href='/'>
                    <p className='font-semibold text-lg'>{user?.username}</p>
                </Link>
                <div className='font-semibold text-lg'>
                    <LogoutButton />
                </div>
            </div>
        </header>
  )
}

export default Header