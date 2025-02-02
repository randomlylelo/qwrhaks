"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [captionResult, setCaptionResult] = useState("");

  const handleGenerateCaption = async () => {
    try {
      // In a real application, do NOT use process.env.API_KEY directly here.
      // Instead, call an API route. This is just a demo.
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-pro",
      });

      // Fetch the image as ArrayBuffer
      const imageResp = await fetch(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"
      ).then((response) => response.arrayBuffer());

      // Generate caption
      const result = await model.generateContent([
        {
          inlineData: {
            data: Buffer.from(imageResp).toString("base64"),
            mimeType: "image/jpeg",
          },
        },
        "Caption this image.",
      ]);

      // result.response.text() returns a Promise;
      // if you want the string, await it or use then()
      const caption = await result.response.text();

      console.log("Caption:", caption);
      setCaptionResult(caption);
    } catch (error) {
      console.error("Error generating caption:", error);
    }
  };

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
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 py-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Select a Day to Log Your Emissions
          </h2>

          {/* Calendar (shadcn component) */}
          <div className="rounded-md border p-4 mb-6">
            <Calendar />
          </div>

          {/* Generate Caption Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button variant="default" className="w-full sm:w-auto" onClick={handleGenerateCaption}>
              Generate Image Caption
            </Button>

            {captionResult && (
              <div className="mt-4 p-4 border rounded-md max-w-sm bg-gray-50">
                <p className="font-semibold">Caption:</p>
                <p>{captionResult}</p>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-auto py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CO2 Tracker App</p>
        </footer>
      </div>
    </>
  );
}
