import { redirect } from "next/navigation"

function Page() {
  redirect('/student/dashboard')
  return null
}

export default Page