import { Banner } from "@/components/banner"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main>
        <Banner />
      </main>
      <Footer />
    </div>
  )
}
