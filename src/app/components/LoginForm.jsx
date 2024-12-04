'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api-auth/login/`, {
                username: username
                password: password
            })
        } catch(error) {
            console.log(error)
        }
        console.log(response)

        // const res = await fetch('http://127.0.0.1:8000/api/token/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),
        // });

        // if (res.ok) {
        //     const data = await res.json();
        //     localStorage.setItem('token', data.access); // Store the token
        //     router.push('/'); // Redirect to home or dashboard
        // } else {
        //     setError('Invalid credentials');
        // }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default LoginForm