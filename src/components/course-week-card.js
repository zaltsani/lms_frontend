import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import Link from 'next/link'

function CourseWeeksCard({ courseItems, courseDetails, pathName }) {
  return (
    <Card>
      <CardHeader className="font-semibold">Pembelajaran</CardHeader>
      <CardContent className="space-y-4">
        {courseItems && courseItems.map((item, index) =>(
          <Card key={index} className="hover:bg-gray-100">
            <Link href={`${pathName}/week/${item.id}`}>
              <CardContent className="pt-6">Pertemuan {item.week_number} - {item.title}</CardContent>
            </Link>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

export default CourseWeeksCard