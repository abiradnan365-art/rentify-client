import { Banner } from "@/components/banner"
import { FeaturedEquipments } from "@/components/FeaturedEquipments"
import { HowRentifyWorks } from "@/components/HowRentifyWorks"
import { WhyChooseRentify } from "@/components/WhyChooseRentify"

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <main>
        <Banner />
        <FeaturedEquipments />
        <WhyChooseRentify />
        <HowRentifyWorks />
      </main>
    </div>
  )
}
