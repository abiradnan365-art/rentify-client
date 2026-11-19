import { Banner } from "@/components/banner"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main>
        <Banner />
      </main>
    </div>
  )
}
