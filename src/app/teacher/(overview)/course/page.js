'use client'

import { useAuthContext } from "@/utils/AuthContext"
import { useEffect, useState } from "react"
import AxiosInstance from "@/utils/axiosInstance"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AppBreadcrumb from "@/components/app-breadcrumb"

function Page() {
    const { user } = useAuthContext()
    const [courses, setCourses] = useState(null)

    const itemsBreadcrumb = [
        {title: "Course", href: "/teacher/course"}
    ]

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await AxiosInstance.get(`/api/teacher/${user?.id}/course/`)
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
            <AppBreadcrumb items={itemsBreadcrumb} />
            <p className="py-7 font-semibold text-xl">
                <span>Course Page</span>
                {/* <span className="text-blue-700 font-bold">{user.name}</span> */}
            </p>
            
            <Card>
                <CardHeader className="flex-row justify-between items-center">
                    <div className="font-semibold text-lg">Kelas</div>
                    <Link href={'/teacher/course/create'}>
                        <button className="rounded-lg p-2 bg-blue-500 font-semibold text-gray-100">Buat Kelas</button>
                    </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                    {courses && courses.map((course, index) => (
                        <Card key={index} className="hover:bg-gray-100">
                            <Link href={`/teacher/course/${course.id}`}>
                                <CardHeader className="font-semibold text-lg">{course.title}</CardHeader>
                                <CardContent>
                                    Description: {course.description}
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default Page