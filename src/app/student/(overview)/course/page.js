'use client'

import { useAuthContext } from "@/utils/AuthContext"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import { useEffect, useState } from "react"
import AxiosInstance from "@/utils/axiosInstance"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import React from "react"
import AppBreadcrumb from "@/components/app-breadcrumb"

function Page() {
    const { user } = useAuthContext()
    const [courses, setCourses] = useState(null)
    const itemsBreadcrumb = [
        {title: "Course", href: "/course"}
    ]

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await AxiosInstance.get(`/api/student/${user.id}/course/`)
                if (response.status === 200) {
                    setCourses(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourse()
    }, [])

    return (
        <div>
            <AppBreadcrumb items={itemsBreadcrumb}/>
            <p className="py-7 font-semibold text-xl">
                <span>Courses </span>
                <span className="text-blue-700 font-bold">{user.name}</span>
            </p>
            <Card>
                <CardHeader>
                    <span className="font-bold text-xl">Courses</span>
                </CardHeader>
                <CardContent className="space-y-4">
                    {courses && courses.map((course, index) => (
                        <div key={index} className="mb-6 hover:bg-gray-100">
                        <Link key={index} href={`/student/course/${course.course.id}/`}>
                            <Card key={index}>
                                <CardContent className="pt-6">
                                    <p className="font-semibold text-lg">{course.course.title}</p>
                                    <p>Teacher: {course.course.teacher.name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProtectedRoute(Page)