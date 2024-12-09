import LoginForm from '../components/LoginForm'

export default function Page() {
    
    return (
        <div className='w-screen h-screen overflow-hidden relative bg-blue-400 before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30v'>
            <section className="h-screen flex flex-col gap-10 items-center justify-center py-24">
                <div className='max-w-lg max-w-xs bg-blue-800 shadow-2xl rounded-lg mx-auto text-center py-12 px-12 mt-4 rounded-xl'>
                    <p className='text-gray-200 text-center font-extrabold -mt-3 text-3xl'>Login Page</p>
                    <LoginForm />
                </div>
            </section>
        </div>
    )
}