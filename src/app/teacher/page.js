'use client'

import { useAuthContext } from "@/utils/AuthContext"
import ProtectedRoute from "../components/ProtectedRoute"
import { useEffect, useState } from "react"
import AxiosInstance from "@/utils/axiosInstance"
import Link from "next/link"

function Page() {
    const { user } = useAuthContext()
    const [courses, setCourses] = useState(null)
    console.log(courses)

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
        <div className="mx-20">
            <p className="p-10 font-semibold text-xl">Selamat Datang, {user?.name}</p>

            <div className="mb-5">
                <Link href={'/teacher/course/create'}>
                    <button className="rounded-lg p-2 bg-blue-500 font-semibold text-gray-100">Buat Kelas</button>
                </Link>
            </div>

            <div className="gap-y-5">
                <p className="font-semibold text-lg">Kelas</p>
                {courses ? (
                    courses.map((course, index) => (
                        <div key={index} className="my-4 p-4 border rounded-lg border-gray-500">
                            <Link href={`/teacher/course/${course?.id}/`}>
                                <p className="font-semibold text-lg">{course?.title}</p>
                                <p>Teacher: {course?.teacher?.name}</p>
                            </Link>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default ProtectedRoute(Page)