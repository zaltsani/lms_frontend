import LoginForm from '../components/LoginForm'

export default function Page() {
    return (
        <div>
            <section className="flex flex-col items-center justify-center py-24">
                <p>Login Page</p>
                <LoginForm />
            </section>
        </div>
    )
}