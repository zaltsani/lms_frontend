"use client"

import ProtectedRoute from '@/app/components/ProtectedRoute'
import React from 'react'

function layout({ children }) {
  return (
    <div className="mx-10 md:mx-15 lg:mx-20">{children}</div>
  )
}

export default ProtectedRoute(layout)