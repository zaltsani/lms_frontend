'use client'

import { useAuthContext } from '@/utils/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = (Component) => {
    return (props) => {
        const { user, loading } = useAuthContext()
        const router = useRouter()

        useEffect(() => {
            if (!loading && user === null) router.push('/login')
        }, [loading, user])

        if (loading) {
            return <div>Loading...</div>
        }

        if (user) {
            return <Component {...props} />
        }

        return null
    }
}

export default ProtectedRoute