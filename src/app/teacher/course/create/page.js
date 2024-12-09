'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import { useAuthContext } from '@/utils/AuthContext'
import AxiosInstance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await AxiosInstance.post('/api/course/create/', {
            title: title,
            description: description,
            teacher: user.id
        })
        router.push('/teacher/')
    }

    return (
        <div className='flex flex-col justify-center m-10'>
            <div>
                <p>Buat Kelas</p>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Nama Kelas'
                        required
                        className='className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Deskripsi'
                        required
                        className='className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default ProtectedRoute(Page)