'use client'

import AuthContextProvider from "@/utils/AuthContext"
import Header from "../components/Header"
import ProtectedRoute from "../components/ProtectedRoute"

function layout({children}) {
    return (
        <AuthContextProvider>
            <Header />
            <main>
                {children}
            </main>
        </AuthContextProvider>
    )
}

export default layout