'use client'

import { useAuthContext } from "@/utils/AuthContext"
import ProtectedRoute from "../components/ProtectedRoute"
import { useEffect, useState } from "react"
import AxiosInstance from "@/utils/axiosInstance"
import Link from "next/link"

function Page() {
    const { user } = useAuthContext()
    const [courses, setCourses] = useState(null)

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
    console.log(courses)

    return (
        <div className="mx-20">
            <p className="p-10 font-semibold text-xl">Welcome Back, {user.name}</p>
            <div className="gap-y-5">
                <p className="font-semibold text-lg">Courses</p>
                {courses ? (
                    courses.map((course, index) => (
                        <div key={index} className="my-4 p-4 border rounded-lg border-gray-500">
                            <Link href={`/student/course/${course.course.id}/`}>
                                <p className="font-semibold text-lg">{course.course.title}</p>
                                <p>Teacher: {course.course.teacher.name}</p>
                            </Link>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default ProtectedRoute(Page)