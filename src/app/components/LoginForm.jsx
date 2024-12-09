'use client'

// import { useAuthContext } from "@/utils/AuthContext"
import AxiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const router = useRouter()
    // const { setUser } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await AxiosInstance.post(`api/dj-rest-auth/login/`, {
                username: username,
                password: password,
            })
            localStorage.setItem('token', response.data.key)
            
            // Fetch the user data and update the context 
            const userResponse = await AxiosInstance.get('api/users/me/')
            if (userResponse.status === 200) {
                if (userResponse?.data?.is_staff) {
                    router.push('/teacher')
                } else {
                    router.push('/student')
                }
            }
        } catch(error) {
            setError(error.response?.data?.detail || 'Login failed')
        }
    }

    return (
        <div className="container py-5 max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                {error && <p className="text-white">{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default LoginForm