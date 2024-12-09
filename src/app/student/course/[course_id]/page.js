'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import AxiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const StudentCoursePage = () => {
    const [courseDetail, setCourseDetail] = useState(null)
    const [courseWeek, setCourseWeeks] = useState(null)
    const [courseMaterial, setCourseMaterial] = useState(null)
    
    const pathName = usePathname()
    const courseId = pathName.split('/')[3]

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/`)
                if (response.status === 200) {
                    setCourseDetail(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseDetail()

        const fetchCourseWeeks = async() => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/`)
                if (response.status === 200) {
                    setCourseWeeks(response.data)
                }
            } catch(error) {
                console.log(error)
            }
        }
        fetchCourseWeeks()

    }, [])

    return (
        <div className='m-10'>
            <p className='font-semibold text-lg p-5'>Course</p>
            <div className='grid grid-rows gap-y-3'>
                {courseWeek ? (
                    courseWeek.map((courseWeekDetail) => (
                        <Link key={courseWeekDetail.id} href={`${pathName}/week/${courseWeekDetail.id}`}>
                            <div
                                className='p-5 border rounded-lg border-gray-500'
                            >
                                Pertemuan {courseWeekDetail.week_number} - {courseWeekDetail.title}
                            </div>
                        </Link>
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default ProtectedRoute(StudentCoursePage)