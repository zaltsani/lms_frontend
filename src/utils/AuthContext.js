'use client'

import { createContext, useContext, useEffect, useState } from "react"
import AxiosInstance from "./axiosInstance"

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    loading: true
})

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await AxiosInstance.get('api/users/me/')
                if (response.status === 200) {
                    setUser(response.data)
                    setIsAuthenticated(true)
                }
            } catch(error) {
                console.log("Error fetching user:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, loading }} >
            {loading ? <div className="h-screen flex justify-center items-center">LOADING...</div> : props.children}
        </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider