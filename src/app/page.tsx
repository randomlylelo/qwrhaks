import React from 'react'
import Head from 'next/head'
// Import your shadcn calendar component (or a placeholder)
import { Calendar } from '@/components/ui/calendar'
// Import your shadcn button component (or a placeholder)
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <Head>
        <title>CO2 Tracker</title>
        <meta name="description" content="Track your CO2 emissions easily." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main container for the page */}
      <div className="flex flex-col min-h-screen bg-white">

        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-green-600 px-4 py-4 shadow-md">
          <h1 className="text-xl font-bold text-white">CO2 Tracker</h1>
          {/* You could add a menu icon or user profile icon here */}
        </header>

        {/* Content Area */}
        <main className="flex-grow px-4 py-6">
          {/* Title or prompt */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Select a Day to Log Your Emissions
          </h2>

          {/* Calendar component (shadcn placeholder) */}
          <div className="rounded-md border p-4 mb-6">
            <Calendar />
          </div>

          {/* Button below the calendar */}
          <div className="flex justify-center">
            <Button variant="default" className="w-full sm:w-auto">
              Add Emission Log
            </Button>
          </div>
        </main>

        {/* Optional Footer */}
        <footer className="mt-auto py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CO2 Tracker App</p>
        </footer>
      </div>
    </>
  )
}
