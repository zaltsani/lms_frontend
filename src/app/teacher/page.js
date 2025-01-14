import { redirect } from "next/navigation"

function Page() {
  redirect('/teacher/dashboard')
  return null
}

export default Page