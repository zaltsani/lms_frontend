'use client'

import AppBreadcrumb from '@/components/app-breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AxiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaFileAlt } from "react-icons/fa";

const Page = () => {
    const [courseWeek, setCourseWeek] = useState(null)
    const [courseMaterial, setCourseMaterial] = useState(null)
    const [courseAttendances, setCourseAttendances] = useState(null)

    const pathName = usePathname()
    const courseId = pathName.split('/')[3]
    const week = pathName.split('/')[5]

    const itemsBreadcrumb = [
        {title: "Course", href: "/teacher/course"},
        {title: courseWeek?.course.title, href: `/teacher/course/${courseWeek?.course.id}`},
        {title: `Pertemuan ${courseWeek?.week_number}`, href: `/teacher/course/${courseWeek?.course.id}/week/${courseWeek?.id}`},
    ]
    

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

        const fetchCourseAttendances = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/${week}/attendances/`)
                if (response.status === 200) {
                    setCourseAttendances(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseAttendances()

    }, [])


    return (
        <div className='space-y-7'>
            <AppBreadcrumb items={itemsBreadcrumb} />
            <div className='font-semibold text-lg'>Pertemuan {courseWeek?.week_number} - {courseWeek && courseWeek.title}</div>            
            <Card>
                <CardHeader className="font-semibold text-lg">Materi</CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader className="font-semibold">{courseMaterial && courseMaterial.title}</CardHeader>
                        <CardContent className="space-y-4">
                            <div>{courseMaterial && courseMaterial.description}</div>
                            {courseMaterial?.file && (
                                <div>
                                    <Link href={courseMaterial.file} className='flex items-center space-x-2' target='_blank'>
                                        <FaFileAlt className='text-xl' />
                                        <span>File Materi</span>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter>
                    <Link href={`${pathName}/materi`}>
                        <Button variant="secondary" className="px-10">Edit</Button>
                    </Link>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader className="font-semibold">Presensi</CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">Kehadiran</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courseAttendances && courseAttendances.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{student.student.name}</TableCell>
                                    <TableCell className={`font-semibold text-center ${student.is_present ? "text-blue-500" : "text-red-500"}`}>{student.is_present ? "Hadir" : "Absen"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Link href={`${pathName}/presensi/`}>
                        <Button variant="secondary" className="px-10">Edit</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page