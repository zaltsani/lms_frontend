'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import AppBreadcrumb from '@/components/app-breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AxiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [courseDetail, setCourseDetail] = useState(null)
    const [courseWeek, setCourseWeeks] = useState(null)
    const [courseMaterial, setCourseMaterial] = useState(null)
    const [students, setStudents] = useState(null)
    
    const pathName = usePathname()
    const courseId = pathName.split('/')[3]

    const itemsBreadcrumb = [
        {title: "Course", href: "/teacher/course"},
        {title: courseDetail?.title, href: `/teacher/course/${courseDetail?.id}`}
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

        const fetchStudentCourse = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/students/`)
                if (response.status === 200) {
                    setStudents(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudentCourse()

    }, [])
    console.log(students)

    return (
        <div className='space-y-7'>
            <AppBreadcrumb items={itemsBreadcrumb} />
            <div>
                <p className='font-semibold text-xl'>{courseDetail?.title}</p>
            </div>
            <Card>
                <CardHeader className="flex-row justify-between items-center">
                    <div className='font-semibold text-lg'>Pembelajaran</div>
                    <Link href={'/teacher/course/create'}>
                        <Button variant="secondary">Buat Pembelajaran</Button>
                    </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                    {courseWeek && courseWeek.map((course, index) => (
                        <Card key={index} className="hover:bg-gray-100">
                            <Link href={`${pathName}/week/${course.id}`}>
                                <CardHeader>Pertemuan {course.week_number} - {course.title}</CardHeader>
                            </Link>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="font-semibold text-lg">Daftar Siswa</CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students && students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{student.student.name}</TableCell>
                                    <TableCell>{student.student.username}</TableCell>
                                    <TableCell>{student.student.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page