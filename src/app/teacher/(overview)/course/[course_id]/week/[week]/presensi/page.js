'use client'

import ProtectedRoute from '@/app/components/ProtectedRoute'
import AppBreadcrumb from '@/components/app-breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AxiosInstance from '@/utils/axiosInstance'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [students, setStudents] = useState([])
    const [courseWeek, setCourseWeek] = useState(null)
    const [courseAttendances, setCourseAttendances] = useState(null)

    const router = useRouter()
    const pathName = usePathname()
    const courseId = pathName.split('/')[3]
    const week = pathName.split('/')[5]
    const previousPath = pathName.split('/').slice(0, 6).join('/')

    // const thClassName = 'border-b border-blue-gray-100 bg-blue-gray-50 p-4'
    // const tdClassName = 'border-b border-blue-gray-100 bg-blue-gray-50 p-2'

    const itemsBreadcrumb = [
        {title: "Course", href: "/teacher/course"},
        {title: courseWeek?.course.title, href: `/teacher/course/${courseWeek?.course.id}`},
        {title: `Pertemuan ${courseWeek?.week_number}`, href: `/teacher/course/${courseWeek?.course.id}/week/${courseWeek?.id}`},
        {title: "Presensi", href: `/teacher/course/${courseWeek?.course.id}/week/${courseWeek?.id}/presensi`},
    ]

    useEffect(() => {
        const fetchStudentCourse = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/students/`)
                if (response.status === 200) {
                    let data = response.data
                    data = data.map(d => ({
                        id: d.id,
                        student: d.student,
                        is_present: 'present'
                    }))
                    setStudents(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudentCourse()

        const fetchCourseWeek = async () => {
            try {
                const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/${week}/`)
                if (response.status === 200) {
                    setCourseWeek(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseWeek()

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

    const handleAttendanceChange = (studentId, is_present) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, is_present } : student
            )
        )
    }

    const handleSubmit = async () => {
        const data = students.map(record => ({
            is_present: record.is_present === 'present',
            course_week: courseWeek.id,
            student: record.student.id
        }))
        console.log(data)
        try {
            const response = await AxiosInstance.post(`/api/course/${courseId}/weeks/${week}/attendances/create/`, data)
            console.log(response)
            router.push(previousPath)            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className='space-y-7'>
            <AppBreadcrumb items={itemsBreadcrumb} />
            <div className='font-semibold text-lg'>Presensi</div>
            <Card>
                <CardHeader>Presensi</CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">Presensi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{student.student.name}</TableCell>
                                    <TableCell>
                                        <div className='flex justify-center text-sm'>
                                            <button
                                                onClick={() => handleAttendanceChange(student.id, 'present')}
                                                className={`py-2 px-4 rounded rounded-r-none ${student.is_present === 'present' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Hadir
                                            </button>
                                            <button
                                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                                                className={`py-2 px-4 rounded rounded-l-none ${student.is_present === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Tidak Hadir
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" className="w-1/3" onClick={handleSubmit}>Submit</Button>
                </CardFooter>
            </Card>

            {/* <div className='justify-center rounded shadow m-10 mb-0 items-center'>
                <table className='w-full min-w-max table-auto'>
                    <thead>
                        <tr className='text-center'>
                            <th className={`${thClassName}`}>No.</th>
                            <th className={`${thClassName} text-left`}>Nama</th>
                            <th className={`${thClassName}`}>Presensi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td className={tdClassName}>{index + 1}</td>
                                    <td className={`${tdClassName} text-left`}>{student.student.name}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <div className='flex justify-center text-sm'>
                                            <button
                                                onClick={() => handleAttendanceChange(student.id, 'present')}
                                                className={`py-2 px-4 rounded rounded-r-none ${student.is_present === 'present' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Hadir
                                            </button>
                                            <button
                                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                                                className={`py-2 px-4 rounded rounded-l-none ${student.is_present === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                Tidak Hadir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={handleSubmit} className='font-semibold text-md text-gray-200 p-2 rounded-lg bg-blue-600 w-full'>Submit</button>
            </div> */}

        </div>
    )
}

export default ProtectedRoute(Page)