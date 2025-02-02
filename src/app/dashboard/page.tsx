"use client";

import React, { useState } from "react";
import { User } from 'lucide-react';
import Head from "next/head";
import { Calendar } from "react-calendar";
import LogRunPopup from "./LogRunPopup";


export default function Page() {
    const [date, setDate] = useState<Date | null>(new Date());
    const [info, setInfo] = useState<string | null>(null);

    const onDateChange = (value: Date | Date[]) => {
      const newDate = Array.isArray(value) ? value[0] : value;
      setDate(newDate);
      // Fetch or set the information for the selected date
      // For demonstration, we'll just set a dummy info
      setInfo(`Information for ${newDate.toDateString()}`);
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

            <div className="flex items-center">
                <User className="w-48 h-48" />
                 <div className="ml-4">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold mb-4">Daily Streak:</h2>
                        <div id="streak-count" className="text-xl font-bold mb-4">0</div>
                    </div>
                    <LogRunPopup />
                </div>
            </div>

            <div>
              <h1>Track Your CO2 Emissions</h1>
              <Calendar
                onChange={onDateChange}
                value={date}
                tileContent={({ date, view }) => view === 'month' && (
                  <button onClick={() => onDateChange(date)}>
                    {date.getDate()}
                  </button>
                )}
              />
            </div>

    
            </main>
    
            <footer className="mt-auto py-4 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} CO2 Tracker App</p>
            </footer>
        </>
      );
}

