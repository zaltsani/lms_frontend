'use client'

import AxiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [courseWeek, setCourseWeek] = useState(null)
    const [courseMaterial, setCourseMaterial] = useState(null)

    const pathName = usePathname()
    const courseId = pathName.split('/')[3]
    const week = pathName.split('/')[5]

    useEffect(() => {
        const fetchCourseWeek = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/${week}/`)
                if (response.status === 200) {
                    setCourseWeek(response.data)
                }
            } catch(error) {
                console.log(error)
            }
        }
        fetchCourseWeek()

        const fetchCourseMaterial = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/${week}/materials/`)
                if (response.status === 200) {
                    setCourseMaterial(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseMaterial()

    }, [])


    return (
        <div>
            <p className='font-semibold text-lg'>{courseWeek && `${courseWeek.course.title} - Pertemuan ${courseWeek.week_number}` }</p>
            <p className='font-semibold text-lg'>{courseWeek && courseWeek.title}</p>
            <div className='my-5'>
                <p>{courseMaterial && courseMaterial.title}</p>
                {courseMaterial && courseMaterial.file && (
                    <Link href={courseMaterial.file}>File</Link>
                )}
                <div>{courseMaterial && courseMaterial.description}</div>
            </div>
        </div>
    )
}

export default Page