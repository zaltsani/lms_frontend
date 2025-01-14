'use client'

import { useAuthContext } from "@/utils/AuthContext"
import { useEffect, useState } from "react"
import AxiosInstance from "@/utils/axiosInstance"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AppBreadcrumb from "@/components/app-breadcrumb"
import { Button } from "@/components/ui/button"

function Page() {
    const { user } = useAuthContext()
    const [courses, setCourses] = useState(null)
    
    const itemsBreadcrumb = [
        {title: "Dashboard", href: "/student"}
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
                <span>Welcome Back, </span>
                <span className="text-blue-700 font-bold">{user.name}</span>
            </p>
            <Card>
                <CardHeader className="flex-row justify-between items-center">
                    <div className="font-semibold text-2xl">Kelas</div>
                    <Link href={'/teacher/course/create'}>
                        <Button variant="secondary">Buat Kelas</Button>
                    </Link>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-4">
                    {courses && courses.map((course, index) => (
                        <Card key={index} className="hover:bg-blue-700 bg-blue-600 bg-opacity-100 text-secondary-foreground">
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