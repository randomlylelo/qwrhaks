import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">My CO2 Tracker</h1>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold mb-6">Your CO2 Calendar</h2>

        {/* shadcn/ui Calendar */}
        <div className="mb-6 w-full max-w-sm">
          <Calendar className="mx-auto" />
          {/*
            Optionally pass props like:
            <Calendar
              mode="single"
              onSelect={(date) => console.log(date)}
              className="mx-auto"
            />
          */}
        </div>

        {/* shadcn/ui Button */}
        <Button
          onClick={() => {
            alert("Tracking your CO2 usage!");
          }}
        >
          Track CO2
        </Button>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-green-500 text-white py-2 text-center">
        <p>© {new Date().getFullYear()} CO2 Tracker</p>
      </footer>
    </div>
  )
}
