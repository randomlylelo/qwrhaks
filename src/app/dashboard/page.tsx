'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { User } from 'lucide-react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Button } from '@/components/ui/button';
import LogRunPopup from './LogRunPopup';
import EmissionsWrappedPopup from './EmissionsWrappedPopup';

type Entry = {
  _id?: string;
  miles: number;
  totalTime: string;
  createdAt: string; // ISO date string from MongoDB
  image?: string | null;
};

export default function Page() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEntryCreated = () => {
    fetchEntries();
  };

  function getColorForEntry(entry: Entry) {
    if (entry.miles < 5) return 'green';
    if (entry.miles < 10) return 'orange';
    return 'red';
  }

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const matchingEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === date.toDateString();
    });

    if (matchingEntries.length > 0) {
      const dotColor = getColorForEntry(matchingEntries[0]);
      return (
        <div
          style={{
            marginTop: '0.2rem',
            height: '6px',
            width: '6px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            margin: '0 auto',
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
        <meta name='description' content='Track your CO2 emissions easily.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Header */}
      <header className='sticky top-0 z-10 bg-green-600 shadow-md'>
        <div className='mx-auto flex max-w-screen-lg items-center justify-between px-4 py-4'>
          <h1 className='text-xl font-bold text-white'>CO2 Tracker</h1>
        </div>
      </header>

      {/* Main */}
      <main className='flex-grow px-4 py-6'>
        <div className='mx-auto max-w-screen-lg'>
          {/* Desktop-friendly grid layout */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* Left Column: User info, streak, and popups */}
            <div>
              <div className='mb-8 flex items-center space-x-4'>
                <User className='h-16 w-16' />
                <div>
                  <h2 className='text-xl font-bold'>Daily Streak:</h2>
                  <div id='streak-count' className='text-xl font-bold'>
                    0
                  </div>
                </div>
              </div>

              <div className='mb-6 flex flex-col space-y-2'>
                {/* Log run popup */}
                <LogRunPopup onEntryCreated={handleEntryCreated} />

                {/* Wrapped popup */}
                <EmissionsWrappedPopup />
              </div>
            </div>

            {/* Right Column: Heading and Calendar */}
            <div>
              <h1 className='mb-4 text-2xl font-semibold'>
                Track Your CO2 Emissions
              </h1>
              {/* Calendar container */}
              <div className='max-w-full'>
                <Calendar tileContent={renderTileContent} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='mt-auto py-4 text-center text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} CO2 Tracker App</p>
      </footer>
    </>
  );
}
