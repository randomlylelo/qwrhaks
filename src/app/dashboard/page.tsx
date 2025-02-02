"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { User } from "lucide-react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Button } from "@/components/ui/button";
import LogRunPopup from "./LogRunPopup";

// Define the shape of your entries
type Entry = {
  _id?: string;
  miles: number;
  totalTime: string;
  createdAt: string; // from MongoDB, an ISO date string
  image?: string | null;
};

export default function Page() {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Fetch all entries from the server
  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/entries");
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  // Run once on mount to load entries
  useEffect(() => {
    fetchEntries();
  }, []);

  /**
   * Called after LogRunPopup successfully saves an entry.
   * We'll refetch the entries to update the calendar.
   */
  const handleEntryCreated = () => {
    fetchEntries();
  };

  /**
   * Simple example function to map miles -> color for the day.
   */
  function getColorForEntry(entry: Entry) {
    if (entry.miles < 5) return "green";
    if (entry.miles < 10) return "orange";
    return "red";
  }

  /**
   * For each day in the month view, we check if there's an entry.
   * If yes, we add a small colored dot.
   */
  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    // Filter entries matching this date (ignoring time by comparing date strings).
    const matchingEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === date.toDateString();
    });

    if (matchingEntries.length > 0) {
      // Use the first entry or compute a combined color if you prefer
      const dotColor = getColorForEntry(matchingEntries[0]);
      return (
        <div
          style={{
            marginTop: "0.2rem",
            height: "6px",
            width: "6px",
            borderRadius: "50%",
            backgroundColor: dotColor,
            margin: "0 auto",
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <title>CO2 Tracker</title>
        <meta name="description" content="Track your CO2 emissions easily." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-10 flex items-center justify-between bg-green-600 px-4 py-4 shadow-md">
        <h1 className="text-xl font-bold text-white">CO2 Tracker</h1>
      </header>

      <main className="flex-grow px-4 py-6">
        <div className="flex items-center mb-8">
          <User className="w-16 h-16 mr-4" />
          <div>
            <h2 className="text-xl font-bold">Daily Streak: </h2>
            <div id="streak-count" className="text-xl font-bold">
              0
            </div>
          </div>
          {/* Pass the callback to LogRunPopup */}
          <LogRunPopup onEntryCreated={handleEntryCreated} />
        </div>

        <h1 className="mb-4 text-2xl font-semibold">Track Your CO2 Emissions</h1>
        <Calendar tileContent={renderTileContent} />
      </main>

      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CO2 Tracker App</p>
      </footer>
    </>
  );
}
