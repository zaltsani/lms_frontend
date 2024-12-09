import AuthContextProvider from "@/utils/AuthContext"
import Header from "../components/Header"

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