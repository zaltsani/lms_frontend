'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import AppBreadcrumb from '@/components/app-breadcrumb'
import CourseWeeksCard from '@/components/course-week-card'
import AxiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const StudentCoursePage = () => {
    const [courseDetail, setCourseDetail] = useState(null)
    const [courseWeek, setCourseWeeks] = useState(null)
    const [courseMaterial, setCourseMaterial] = useState(null)

    console.log("Course week", courseWeek)
    
    const pathName = usePathname()
    const courseId = pathName.split('/')[3]

    const itemsBreadcrumb = [
        {title: "Course", href: "/course"},
        {title: courseDetail?.title, href: "/course/1"},
    ]

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
        <div>
            <AppBreadcrumb items={itemsBreadcrumb}/>
            <div className='py-7'>
                <p className='font-semibold text-xl'>{courseDetail?.title}</p>
                <p>Teacher: {courseDetail?.teacher.name}</p>
            </div>
            <CourseWeeksCard
                courseItems={courseWeek}
                courseDetails={courseDetail}
                pathName={pathName}
            />
        </div>
    )
}

export default ProtectedRoute(StudentCoursePage)