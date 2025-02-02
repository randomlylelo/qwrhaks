"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";

export default function Home() {
  

  return (
    <>
      <Head>
        <title>CO2 Tracker</title>
        <meta name="description" content="Track your CO2 emissions easily." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white">
        {/* Navbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-green-600 px-4 py-4 shadow-md">
          <h1 className="text-xl font-bold text-white">CO2 Tracker</h1>
          <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            Login
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 py-6 text-center relative bg-cover bg-center" style={{ backgroundImage: "url('/bg_img_landing.webp')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white">Welcome to CO2 Tracker</h2>
            <p className="mt-2 text-lg text-gray-200">
              Track your CO2 emissions easily.
            </p>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="mt-2 text-lg text-gray-200">
                Our mission is to help individuals and organizations reduce their carbon footprint by providing accurate and easy-to-use tracking tools.
              </p>
            </section>
          </div>
        </main>

        <footer className="mt-auto py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CO2 Tracker. All rights reserved.
        </footer>
      </div>
    </>
  );
}
