"use client"

import AppBreadcrumb from '@/components/app-breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AxiosInstance from '@/utils/axiosInstance'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function Page() {
  const [courseWeek, setCourseWeek] = useState(null)
  const [courseMaterial, setCourseMaterial] = useState(null)

  const pathName = usePathname()
  const courseId = pathName.split('/')[3]
  const week = pathName.split('/')[5]

  const router = useRouter()

  // const form = useForm({
  //   defaultValues: {
  //     course_week: courseWeek?.id,
  //     title: "",
  //     description: "",
  //     file: ""
  //   }
  // })
  // function onSubmit(values) {
  //   console.log(values)
  // }
  const [formMateri, setFormMateri] = useState({
    course_week: "",
    title: "",
    description: "",
    file: ""
  })
  async function handleSubmit (e) {
    e.preventDefault()
    console.log({
      course_week: courseWeek,
      title: formMateri.title,
      description: formMateri.description,
      file: formMateri.file
    })
    const response = await AxiosInstance.post(`/api/course/${courseWeek.course.id}/weeks/${courseWeek.week_number}/materials/create/`, {
      course_week: courseWeek,
      title: formMateri.title,
      description: formMateri.description,
      file: formMateri.file
    })
    console.log("response", response)
    router.push('/teacher/')
  }

  const itemsBreadcrumb = [
    {title: "Course", href: "/teacher/course"},
    {title: courseWeek?.course.title, href: `/teacher/course/${courseWeek?.course.id}`},
    {title: `Pertemuan ${courseWeek?.week_number}`, href: `/teacher/course/${courseWeek?.course.id}/week/${courseWeek?.id}`},
    {title: `Pertemuan ${courseWeek?.week_number}`, href: `/teacher/course/${courseWeek?.course.id}/week/${courseWeek?.id}/materi`},
  ]

  useEffect(() => {
    const fetchCourseWeek = async () => {
      try {
        const response = await AxiosInstance.get(`/api/course/${courseId}/weeks/${week}/`)
        if (response.status === 200) {
          setCourseWeek(response.data)
          setFormMateri({ ...formMateri, course_week: response.data.id })
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

  }, [])


  return (
    <div className='space-y-7'>
      <AppBreadcrumb items={itemsBreadcrumb} />
      <div className='font-semibold text-lg'>Materi {courseWeek?.title}</div>
      <Card>
        <CardHeader className="font-semibold text-xl">Edit Materi</CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label>Title</Label>
            <Input placeholder="Title" value={formMateri.title} onChange={(event) => setFormMateri({ ...formMateri, title: event.target.value })} />
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              rows={5}
              className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              value={formMateri.description}
              onChange={(event) => setFormMateri({ ...formMateri, description: event.target.value})}
            />
          </div>
          <div>
            <Label>File</Label>
            <Input type="file" onChange={(event) => setFormMateri({ ...formMateri, file: event.target.files[0] })} />
          </div>
          <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page