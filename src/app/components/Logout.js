'use client'

import { useAuthContext } from "@/utils/AuthContext"
import AxiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
    const router = useRouter()
    const { setUser } = useAuthContext()

    const handleLogout = async () => {
        try {
            const response = await AxiosInstance.post('/api/dj-rest-auth/logout/')
            if (response.status === 200) {
                // setUser(null)
                localStorage.removeItem('token')
                router.push('/login')
            } else {
                console.error("Logout failed:", response.statusText)
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <button onClick={handleLogout}>
            Log out
        </button>
    )
}

export default LogoutButton